# %%
import requests
import xml.etree.ElementTree as ET
import pandas as pd
import warnings

warnings.filterwarnings('ignore')

# %%
ns = '{http://www.volby.cz/kv/}'

partaje = ['KDU-ČSL','KSČM','ČSSD','ODS','ANO','STAN','SPD','TOP 09','Piráti', 'PRAHA SOBĚ+NK', 'KDU+ODS+TOP 09', 'ODS+TOP 09', 'SPD+Trikolora']
kvros = pd.read_csv('../data/kvros.csv', encoding='windows-1250', sep=';')

kvr = {}
for k in list(kvros.to_dict(orient='index').values()):
    if k['ZKRATKAO8'] in partaje:
        kvr[ str(k['KODZASTUP']) + '_' + str(k['COBVODU']) + '_' + str(k['POR_STR_HL']) ] = k['ZKRATKAO8']
# %%
kvr
# %%
proxies = {
    'http': 'http://3.74.182.134:8888'
}
data = pd.DataFrame()
for i in range(1, 10): #172
    print(i)
    r = requests.get('http://194.149.101.118/pls/kvmedia/vysledky_okrsky?davka=' + str(i), proxies=proxies)
    root = ET.fromstring(r.text)
    for okr in root.findall(ns + 'OKRSEK'):
        tmp = okr.attrib
        tmp.update(okr.find(ns + 'UCAST_OKRSEK').attrib)
        tmp.update({'HL_Ostatní': 0})
        for part in okr.findall(ns + 'HLASY_OKRSEK'):
            pid = okr.get('KODZASTUP') + '_' + okr.get('CIS_OBVODU') + '_' + part.get('POR_STR_HLAS_LIST')
            if pid in kvr.keys():
                tmp.update({'HL_' + kvr[pid].replace('+', '-'): int(part.get('HLASY'))})
            #else:
            #    if tmp['HL_Ostatní'] < int(part.get('HLASY')):
            #        tmp['HL_Ostatní'] = int(part.get('HLASY'))
                
        data = data.append(tmp, ignore_index=True)


# %%
data.fillna(0, inplace=True)

for col in data.columns:
    if col.startswith('HL_'):
        data[col] = data[col].astype('int')

data.to_csv('../scratch/data.csv', encoding='utf-8', index=False)
# %%
