# %%
import json
import xml.etree.ElementTree as ET
import pandas as pd

ns = '{http://www.volby.cz/ps/}'

# %%
partaje = {}
part_data = ET.parse('./data/psrkl.xml').getroot()
for row in part_data:
    partaje['part_' + row.find(ns + 'KSTRANA').text] = {
        'naz': row.find(ns + 'ZKRATKAK30').text,
        'zkr': row.find(ns + 'ZKRATKAK8').text,
    }

# %%
obce = {}
ob_data = ET.parse('./data/pscoco.xml').getroot()
for row in ob_data:
    obce[int(row.find(ns + 'OBEC').text)] = row.find(ns + 'NAZEVOBCE').text

# %%
okr_data = pd.read_csv(
    './data/okrs_100.csv').fillna(0).to_dict(orient='index').values()
# %%
data = {}

for row in okr_data:
    obec = row['CIS_OBEC']
    if obec in obce:
        nazob = obce[obec]
    else:
        nazob = None
    if obec not in data:
        data[obec] = {}
    okrsek = row['CIS_OKRSEK']
    data[obec][okrsek] = {
        'zapsani': row['ZAPSANI_VOLICI'],
        'hlasy': row['ODEVZDANE_OBALKY'],
        'hlasy_platne': row['PLATNE_HLASY'],
        'nazob': nazob,
    }
    for key in row.keys():
        if key.startswith('KSTRANA'):
            kstrana = key.split('_')[1]
            data[obec][okrsek]['part_' + kstrana] = row[key]


# %%

# %%
with open('../js/partys.js', 'w', encoding='utf-8') as f:
    f.write('export const partys = ' + json.dumps(partaje, ensure_ascii=False))

# %%
with open('./data/okrsky.geojson', 'r', encoding='utf-8') as f:
    okrs = json.loads(f.read())

# %%
err = []
for ok in okrs['features']:
    cislo = ok['properties']['Cislo']
    obec = ok['properties']['ObecKod']
    if ok['properties']['MomcKod'] is not None:
        obec = ok['properties']['MomcKod']
    try:
        ok['properties'].update(data[obec][cislo])
    except:
        err.append([obec, cislo])
print(len(err))

# %%
with open('./data/data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(okrs, ensure_ascii=False))

# %%

# %%
