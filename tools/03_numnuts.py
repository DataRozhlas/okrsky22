# %%
import pandas as pd
# %%
d = pd.read_csv('../data/VAZ0302_0051_CS.csv', encoding='windows-1250')
# %%
d.loc[d.TEXT2.str.contains('Praha'), 'CHODNOTA1'] = 1100
out = d.set_index('CHODNOTA2')['CHODNOTA1'].to_json()

# %%
with open('../js/nuts.js', 'w') as f:
    f.write('export const numnuts = ' + out + ';')
