const getSheet = async (sheetId, arrProp) => {

    const googleSheetsToObj = (json, arrProp) => {

        const ifArrOrObjForEval = (str) => {
            let ifArrOrObj = (arrOfObjStr) => {
                const trimStr = arrOfObjStr.trim();
                const firstCharcter = trimStr.charAt(0)
                const lastCharcter = trimStr.charAt(trimStr.length - 1)
                if (firstCharcter === '[' && lastCharcter === ']' || firstCharcter === '{' && lastCharcter === '}') {
                    return true
                }
                return false
            }
            try {
                if (!ifArrOrObj(str)) {
                    return false
                }
                eval(str)
                return true
            } catch {
                return false
            }
        }

        let arr = [];
        for (let i in json.feed.entry) {
    
            arr.push(
                (() => {
                    let obj = {};
                    for (let x in arrProp) {
                        let propOfObj = json.feed.entry[i][`gsx$${arrProp[x]}`]['$t']
                        obj[arrProp[x]] = ifArrOrObjForEval(propOfObj) ? eval(propOfObj) : propOfObj
                    }
                    return obj
                })()
            )
        }
        return arr;
    }

    try {
        const response = await fetch(`https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`);
        const json = await response.json();
        return googleSheetsToObj(json, arrProp);
    } catch (err) {
        console.log(err)
    }
}
