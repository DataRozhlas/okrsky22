const parties = { "part_1": { "naz": "Strana zelených", "zkr": "Zelení" }, "part_2": { "naz": "Švýcarská demokracie", "zkr": "Švýcar. demokr." }, "part_3": { "naz": "VOLNÝ blok", "zkr": "Volný blok" }, "part_4": { "naz": "Svoboda a př. demokracie (SPD)", "zkr": "SPD" }, "part_5": { "naz": "Česká str.sociálně demokrat.", "zkr": "ČSSD" }, "part_6": { "naz": "Volte Pr.Blok www.cibulka.net", "zkr": "PB" }, "part_7": { "naz": "ALIANCE NÁRODNÍCH SIL", "zkr": "ANS" }, "part_8": { "naz": "Trikolora Svobodní Soukromníci", "zkr": "TSS" }, "part_9": { "naz": "Aliance pro budoucnost", "zkr": "APB" }, "part_10": { "naz": "Hnutí Prameny", "zkr": "PRAMENY" }, "part_11": { "naz": "Levice", "zkr": "Levice" }, "part_12": { "naz": "PŘÍSAHA Roberta Šlachty", "zkr": "PŘÍSAHA" }, "part_13": { "naz": "SPOLU – ODS, KDU-ČSL, TOP 09", "zkr": "SPOLU" }, "part_14": { "naz": "SENIOŘI 21", "zkr": "SENIOŘI" }, "part_15": { "naz": "Urza.cz: Nechceme vaše hlasy", "zkr": "Nevolte Urza.cz" }, "part_16": { "naz": "Koruna Česká (monarch.strana)", "zkr": "Monarchiste.cz" }, "part_17": { "naz": "PIRÁTI a STAROSTOVÉ", "zkr": "Piráti+STAN" }, "part_18": { "naz": "Komunistická str.Čech a Moravy", "zkr": "KSČM" }, "part_19": { "naz": "Moravské zemské hnutí", "zkr": "MZH" }, "part_20": { "naz": "ANO 2011", "zkr": "ANO" }, "part_21": { "naz": "Otevřeme ČR normálnímu životu", "zkr": "OtČe" }, "part_22": { "naz": "Moravané", "zkr": "Moravané" } };

function getPartyShortName(partyId) {
  return parties[partyId].zkr;
}

function getPartyLongName(partyId) {
  if (partyId === 'UCAST') {
    return 'Účast';
  }
  return partyId
  //return parties[partyId].naz;
}

export { parties, getPartyShortName, getPartyLongName };
