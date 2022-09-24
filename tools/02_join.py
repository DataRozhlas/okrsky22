# %%
import pandas as pd
import json
import numpy as np
import jenks
import copy

# %%
obok = pd.read_csv('../data/VAZ0043_0101_CS.csv', encoding='windows-1250').set_index('CHODNOTA1').to_dict(orient='index')
momc = pd.read_csv('../data/CIS0044_CS.csv', encoding='windows-1250').set_index('CHODNOTA').to_dict(orient='index')

# %%
with open('../data/okrsky.geojson', encoding='utf-8') as f:
    jsn = json.load(f)
# %%
kill = ['fid', 'gml_id', 'Kod', 'Nespravny', 'ObecKod', 'MomcKod', 'Poznamka', 'PlatiOd', 'PlatiDo', 'IdTransakce', 'GlobalniIdNavrhuZmeny']
mcmo_dump = []
for f in jsn['features']:
    f['properties']['Obec'] = obok[f['properties']['ObecKod']]['TEXT1']
    f['properties']['Okres'] = obok[f['properties']['ObecKod']]['TEXT2']
    f['properties']['Momc'] = None
    f['properties']['isMomc'] = False
    f['properties']['okid'] = str(f['properties']['ObecKod']) + '_' + str(f['properties']['Cislo'])
    
    if f['properties']['MomcKod'] is not None:
        f['properties']['Momc'] = momc[f['properties']['MomcKod']]['TEXT']
        n = copy.deepcopy(f)
        n['properties']['isMomc'] = True
        n['properties']['okid'] = str(f['properties']['MomcKod']) + '_' + str(f['properties']['Cislo'])
        
        for k in kill:
            if k in n['properties']:
                del n['properties'][k]
        
        mcmo_dump.append(n)

    for k in kill:
        if k in f['properties']:
            del f['properties'][k]
            
jsn['features'].extend(mcmo_dump)
# %%
okrs = pd.read_csv('../scratch/data.csv')
# %%
okrs['okid'] = okrs.KODZASTUP.astype('str') + '_' + okrs.CIS_OKRSEK.astype('str')
# %%
cls = ['CIS_OBEC', 'CIS_OBVODU', 'CIS_OKRSEK', 'DATUM_CAS_ZPRAC', 'OPAKOVANE', 'PORADI_ZPRAC']
okrs.drop(cls, inplace=True, axis=1)
# %%
okrs.drop_duplicates(subset=['okid'], keep='last', inplace=True)
# %%
okrs = okrs.set_index('okid').to_dict(orient='index')
# %%
for fe in jsn['features']:
    if fe['properties']['okid'] in okrs:
        fe['properties'].update(okrs[fe['properties']['okid']])
    else:
        print(fe['properties']['okid'])
# %%
jsn['features'] = list(filter(lambda x: 'ZAPSANI_VOLICI' in x['properties'], jsn['features']))
# %%
with open('../scratch/map.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(jsn, ensure_ascii=False))

# %%
#breaks
k = 5
nbAttempt = 4

target = open('../js/breaks.js', 'w', encoding='utf-8')
target.truncate()
target.write('export const breaks = {\n')

partaje = ['KDU-ČSL','KSČM','ČSSD','ODS','ANO','STAN','SPD','TOP 09','Piráti', 'PRAHA SOBĚ-NK', 'KDU-ODS-TOP 09', 'ODS-TOP 09', 'SPD-Trikolora']

for i in partaje:
    print('partaj ' + str(i))
    vals = []
    for ftr in jsn['features']:
        try:
            vals.append(ftr['properties']['HL_' + i] / ftr['properties']['PLATNE_HLASY'])
        except:
            print('omit')
        
    vals = np.trim_zeros(vals)
    if np.mean(vals) == 0:
        continue
    else:
        brks = [0, 0, 0, 0]
        try:
            casp = jenks.jenksCaspall(vals, k, nbAttempt, initStyle='kpp')
            brks = casp.breaks
        except:
            pass
        target.write('"HL_' + i + '": ' + str(brks) + ',\n')
        
vals = []
print('ucast')
for ftr in jsn['features']:
    try:
        vals.append(ftr['properties']['ODEVZDANE_OBALKY'] / ftr['properties']['ZAPSANI_VOLICI'])
    except:
        print('omit')

vals = np.trim_zeros(vals)
if np.mean(vals) == 0:
    pass
else:
    brks = [0, 0, 0, 0]
    try:
        casp = jenks.jenksCaspall(vals, k, nbAttempt, initStyle='kpp')
        brks = casp.breaks
    except:
        pass
    target.write('"UCAST": ' + str(brks) + ',\n')       
target.write("};")
target.close()
# %%
print('FINITO')
# %%
