import axios from 'axios'
export function getData() {
    let data = [];
    var btn = 'getUkeirezumiKeiyakuList'
    var key = 'key'
    var user = '02666'
    var cache = new Date()
    return new Promise((resolve, reject) => {

    axios.get(`/api/contractinquiry/32_SELECT_UKEIREZUMI_LIST/pgid/${'KEAT0101r'}/btn/${btn}/key/${key}/user/${user}?cache=${cache}`, {
      changeOrigin: true
    })
    .then((response) => {
      if (response.data[0].result === 'true') {
        data = JSON.parse(JSON.stringify(response.data[1].Table1))
        for (var i in data) {
            data[i].active = i % 4 == 0
        }
        resolve(data)
        return data;
      } else if (response.data[0].result === 'err') {
        alert(response.data[0].content)
        resolve(data)
        return data;
      } else if (response.data[0].result === 'info') {
        alert(response.data[0].content)
        resolve(data)
        return data;
      }
    })
    .catch(error => { console.log(error); reject(error); alert('受入済契約一覧の取得に失敗しました。') })
})
//
        // for (let i = 0; i < countries.length; i++) {
        //     data.push({
        //         country: countries[i],
        //         downloads: Math.round(Math.random() * 20000),
        //         sales: (countries[i] == 'ドイツ' ? -1 : 1) * Math.random() * 10000,
        //         expenses: (countries[i] == 'アメリカ' ? -1 : 1) * Math.random() * 5000,
        //         active: i % 4 == 0
        //     });
        // }
        //
}

export const countries = ['アメリカ', 'ドイツ', 'イギリス', '日本', 'イタリア', 'ギリシャ', 'スペイン', 'ポルトガル', 'オーストラリア'];