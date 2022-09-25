# %%
import pandas as pd
# %%
d = pd.read_csv('../data/VAZ0302_0051_CS.csv', encoding='windows-1250')
# %%
out = d.set_index('CHODNOTA2')['CHODNOTA1'].to_json()
# %%
out
# %%
with open('../js/nuts.js', 'w') as f:
    f.write('export const numnuts = ' + out + ';')
# %%
