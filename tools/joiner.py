# %%
import json
import xml.etree.ElementTree as ET

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
data = {}
okr_data = ET.parse('./data/pst4.xml').getroot()

for row in okr_data:
    obec = int(row.find(ns + 'OBEC').text)
    if obec in obce:
        nazob = obce[obec]
    else:
        nazob = None
    if obec not in data:
        data[obec] = {}
    okrsek = int(row.find(ns + 'OKRSEK').text)
    data[obec][okrsek] = {
        'zapsani': int(row.find(ns + 'VOL_SEZNAM').text),
        'hlasy': int(row.find(ns + 'ODEVZ_OBAL').text),
        'hlasy_platne': int(row.find(ns + 'PL_HL_CELK').text),
        'nazob': nazob,
    }

# %%
okr_partaj_data = ET.parse('./data/pst4p.xml').getroot()
for row in okr_partaj_data:
    obec = int(row.find(ns + 'OBEC').text)
    okrsek = int(row.find(ns + 'OKRSEK').text)
    data[obec][okrsek]['part_' +
                       row.find(ns + 'KSTRANA').text] = int(row.find(ns + 'POC_HLASU').text)

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
