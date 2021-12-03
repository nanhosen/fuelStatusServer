// const parseString = require('xml2js-parser').parseString;
const xml2js = require('xml2js')

const parser = new xml2js.Parser()
const fs = require('fs') 
const axios = require("axios");

const makeDates = function(day1,month1,year1,day2,month2,year2,day3,month3,year3){
	const firstDay = day1 + '-' + month1 + '-' + year1;
	const secondDay = day2 + '-' + month2 + '-' + year2;
	const thirdDay = day3 + '-' + month3 + '-' + year3;
	const dateReqAr = [firstDay,secondDay,thirdDay];
	return dateReqAr
}

var pathMap = ['allData.json','24Data.json','48Data.json'];
// console.log('date', makeDates(1,'JUL',17,2,'JUL',17,3,'JUL',17,))
async function makeReq(day1,month1,year1,day2,month2,year2,day3,month3,year3){
	const dates = await makeDates(day1,month1,year1,day2,month2,year2,day3,month3,year3);
	const axiosArray = []
	Promise.all(
		dates.map((curr)=>{
		const url = 'https://famprod.nwcg.gov/wims/xsql/nfdrs.xsql?stn=&sig=ALL_GB&type=O,R&start='+ curr + '&end=' + curr + '&time=&user=679&fmodel=7G';
		console.log(`date of url: ${Date(Date.now())} & current day: ${curr} & url: ${url}`)
		return axios.get(url)
	}))
	.then((values)=>{
		console.log('values', values)
		values.map((curr,i)=>{
			const ercObj = {};
			const response = curr;
			var fileName = pathMap[i];
			parser.parseString(response.data, function (err, result) {
	      var save = JSON.stringify(result);
	      var saveObj = JSON.parse(save)
	      if(saveObj.nfdrs.row == undefined){
	      	console.log('nodata')
	      	return
	      }
	      // if(i==0){

	      // console.log('save', saveObj.nfdrs)
	      // }
	      // fs.writeFile(`./cron/json${fileName}`, save, function (err) {
	      fs.writeFile(`./cron/json/${fileName}`, save, function (err) {
	      	console.log(`this is the PWD: ${this.process.env.PWD}`)
	      	console.log(`this is the getWimsData directory: ${__dirname}`)		
				  if (err) return console.log(err);
				  console.log('Saved');
				});
    	});
		})
		// console.log('response',response.data)
      
		console.log('hello from wims')
	})
	.catch(function(err){
		console.log('hello: '+ err.message)
	})
	// console.log(axiosArray)

}
// const day1 = 1;
// const month1 = 'JUL';
// const year1 = 17;
// const day2 = 2;
// const month2 = 'JUL';
// const year2 = 17;
// const day3 = 3;
// const month3 = 'JUL';
// const year3 = 17;
// makeReq(day1,month1,year1,day2,month2,year2,day3,month3,year3)
module.exports = makeReq;


// // const xml = '<root>Hello xml2js-parser!</root>';
// // const xml = '<nfdrs><row><sta_id>53808</sta_id><sta_nm>CARPENTER RIDGE</sta_nm><latitude>  38.4583</latitude><longitude>-109.0458</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G1P2</msgc><one_hr>6</one_hr><ten_hr>6</ten_hr><hu_hr>10</hu_hr><th_hr>9</th_hr><xh_hr>0</xh_hr><ic>20</ic><kbdi>285</kbdi><sc>5</sc><ec>64</ec><bi>43</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>30</fl><hrb>6</hrb><wdy>71</wdy><adj>M </adj></row></nfdrs>';
// const xml = require('./data/xml/xml.js');
// // console.log(xml)

// parseString(xml, (err, result) => {
//   const xml = result;
//   // console.log(JSON.stringify(xml.nfdrs))
// });
// var ercObj = {};
// axios.get('https://famprod.nwcg.gov/wims/xsql/nfdrs.xsql?stn=&sig=ALL_GB&type=O&start=1-JUL-17&end=1-JUL-17&time=&user=679&fmodel=7G')
//   .then(response => {
//     var self = this; 
//     parseString(response.data, function (err, result) {
//       self.events = result;
//       var resultAr = [];
//       var keyAr = Object.keys(result.nfdrs.row);
//       // keyAr.push(result.nfdrs.row)
//       // console.log('result', result.nfdrs.row[0])
//       keyAr.map((curr)=>{
//       	var entry = result.nfdrs.row[curr];
//       	var id = entry.sta_id[0];
//       	var erc = entry.ec[0];
//       	// var oneHr = entry.one_hr[0];
//       	// console.log('id',id, 'erc', erc)
//       	ercObj[id]={
//       		"name" : entry.sta_nm[0],
//       		"obDate" : entry.nfdr_dt[0],
//       		"erc" : entry.ec[0],
//       		"oneHr" : entry.one_hr[0],
//       		"tenHr" : entry.ten_hr[0],
//       		"hunHr" : entry.hu_hr[0],
//       		"thouHr" : entry.th_hr[0],
//       		"sc" : entry.sc[0],
//       		"bi" : entry.bi[0],
//       		"adj" : entry.adj[0]
//       	}

//       	resultAr.push(entry)
//       })
//       // console.log(JSON.stringify(ercObj))
//       var save = JSON.stringify(ercObj);
//       fs.writeFile('./data/day1.json', save, function (err) {
// 		  if (err) return console.log(err);
// 		  console.log('Boom');
// 		});
//     });        
//   })

// // var convert = require('xml-js');
// // const xml ='<nfdrs><row num="1"><sta_id>53808</sta_id><sta_nm>CARPENTER RIDGE</sta_nm><latitude>  38.4583</latitude><longitude>-109.0458</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G1P2</msgc><one_hr>6</one_hr><ten_hr>6</ten_hr><hu_hr>10</hu_hr><th_hr>9</th_hr><xh_hr>0</xh_hr><ic>20</ic><kbdi>285</kbdi><sc>5</sc><ec>64</ec><bi>43</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>30</fl><hrb>6</hrb><wdy>71</wdy><adj>M </adj></row><row num="2"><sta_id>260111</sta_id><sta_nm>BARREL SPRINGS</sta_nm><latitude>  41.9111</latitude><longitude>-119.9389</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>2</mp><msgc>7G1A2</msgc><one_hr>13</one_hr><ten_hr>14</ten_hr><hu_hr>17</hu_hr><th_hr>22</th_hr><xh_hr>22</xh_hr><ic>4</ic><kbdi>127</kbdi><sc>7</sc><ec>17</ec><bi>27</bi><sl>2 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>19</fl><hrb>13</hrb><wdy>60</wdy><adj>L </adj></row><row num="3"><sta_id>260112</sta_id><sta_nm>JUNIPER SPRINGS</sta_nm><latitude>  41.0808</latitude><longitude>-119.7764</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>2</mp><msgc>7G1A2</msgc><one_hr>9</one_hr><ten_hr>9</ten_hr><hu_hr>13</hu_hr><th_hr>15</th_hr><xh_hr>15</xh_hr><ic>16</ic><kbdi>405</kbdi><sc>11</sc><ec>41</ec><bi>49</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>35</fl><hrb>9</hrb><wdy>60</wdy><adj>M </adj></row><row num="4"><sta_id>260113</sta_id><sta_nm>BUFFALO CREEK</sta_nm><latitude>  40.5819</latitude><longitude>-119.7900</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>2</mp><msgc>7G1A2</msgc><one_hr>8</one_hr><ten_hr>10</ten_hr><hu_hr>18</hu_hr><th_hr>16</th_hr><xh_hr>16</xh_hr><ic>15</ic><kbdi>576</kbdi><sc>7</sc><ec>31</ec><bi>37</bi><sl>2 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>26</fl><hrb>8</hrb><wdy>60</wdy><adj>L </adj></row><row num="5"><sta_id>260117</sta_id><sta_nm>KNOX #2</sta_nm><latitude>  39.2728</latitude><longitude>-119.9630</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>13</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G2P2</msgc><one_hr>8</one_hr><ten_hr>10</ten_hr><hu_hr>14</hu_hr><th_hr>21</th_hr><xh_hr>-2</xh_hr><ic>9</ic><kbdi>10</kbdi><sc>4</sc><ec>25</ec><bi>25</bi><sl>2 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>18</fl><hrb>8</hrb><wdy>169</wdy><adj>L </adj></row><row num="6"><sta_id>260305</sta_id><sta_nm>LONG HOLLOW</sta_nm><latitude>  41.5542</latitude><longitude>-116.2306</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>3</mp><msgc>7G1P1</msgc><one_hr>16</one_hr><ten_hr>17</ten_hr><hu_hr>17</hu_hr><th_hr>18</th_hr><xh_hr>18</xh_hr><ic>0</ic><kbdi>389</kbdi><sc>2</sc><ec>23</ec><bi>17</bi><sl>2 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>12</fl><hrb>16</hrb><wdy>50</wdy><adj>L </adj></row><row num="7"><sta_id>260306</sta_id><sta_nm>SPRUCE MTN</sta_nm><latitude>  40.4403</latitude><longitude>-114.8111</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>2</mp><msgc>7G2P1</msgc><one_hr>6</one_hr><ten_hr>7</ten_hr><hu_hr>13</hu_hr><th_hr>13</th_hr><xh_hr>13</xh_hr><ic>42</ic><kbdi>458</kbdi><sc>33</sc><ec>49</ec><bi>90</bi><sl>3-</sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>64</fl><hrb>6</hrb><wdy>50</wdy><adj>M </adj></row><row num="8"><sta_id>260308</sta_id><sta_nm>SPRING GULCH</sta_nm><latitude>  40.5931</latitude><longitude>-114.2028</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>3</mp><msgc>7G2P1</msgc><one_hr>6</one_hr><ten_hr>7</ten_hr><hu_hr>13</hu_hr><th_hr>12</th_hr><xh_hr>12</xh_hr><ic>34</ic><kbdi>413</kbdi><sc>17</sc><ec>49</ec><bi>67</bi><sl>4 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>48</fl><hrb>6</hrb><wdy>50</wdy><adj>H </adj></row><row num="9"><sta_id>260309</sta_id><sta_nm>ROCK SPRING CREEK</sta_nm><latitude>  41.6431</latitude><longitude>-114.6431</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>3</mp><msgc>7G1A1</msgc><one_hr>11</one_hr><ten_hr>12</ten_hr><hu_hr>16</hu_hr><th_hr>17</th_hr><xh_hr>17</xh_hr><ic>8</ic><kbdi>468</kbdi><sc>11</sc><ec>30</ec><bi>44</bi><sl>3+</sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>31</fl><hrb>11</hrb><wdy>50</wdy><adj>M </adj></row><row num="10"><sta_id>260310</sta_id><sta_nm>ANTELOPE LAKE</sta_nm><latitude>  41.6847</latitude><longitude>-116.7644</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>3</mp><msgc>7G1A1</msgc><one_hr>12</one_hr><ten_hr>13</ten_hr><hu_hr>17</hu_hr><th_hr>18</th_hr><xh_hr>18</xh_hr><ic>4</ic><kbdi>521</kbdi><sc>3</sc><ec>25</ec><bi>23</bi><sl>2 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>16</fl><hrb>12</hrb><wdy>50</wdy><adj>L </adj></row><row num="11"><sta_id>260314</sta_id><sta_nm>CRANE SPRINGS</sta_nm><latitude>  40.4597</latitude><longitude>-115.8500</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>13</nfdr_tm><nfdr_type>O</nfdr_type><mp>3</mp><msgc>7G1P1</msgc><one_hr>6</one_hr><ten_hr>7</ten_hr><hu_hr>12</hu_hr><th_hr>14</th_hr><xh_hr>14</xh_hr><ic>21</ic><kbdi>423</kbdi><sc>6</sc><ec>48</ec><bi>42</bi><sl>3+</sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>30</fl><hrb>6</hrb><wdy>50</wdy><adj>M </adj></row><row num="12"><sta_id>260315</sta_id><sta_nm>STAG MTN.</sta_nm><latitude>  41.5178</latitude><longitude>-115.3928</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>13</nfdr_tm><nfdr_type>O</nfdr_type><mp>2</mp><msgc>7G2P1</msgc><one_hr>16</one_hr><ten_hr>16</ten_hr><hu_hr>18</hu_hr><th_hr>19</th_hr><xh_hr>19</xh_hr><ic>2</ic><kbdi>270</kbdi><sc>8</sc><ec>20</ec><bi>32</bi><sl>2 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>23</fl><hrb>16</hrb><wdy>50</wdy><adj>L </adj></row><row num="13"><sta_id>421602</sta_id><sta_nm>JOES VALLEY</sta_nm><latitude>  39.3094</latitude><longitude>-111.3228</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G3P2</msgc><one_hr>6</one_hr><ten_hr>7</ten_hr><hu_hr>9</hu_hr><th_hr>11</th_hr><xh_hr>1</xh_hr><ic>32</ic><kbdi>370</kbdi><sc>17</sc><ec>57</ec><bi>72</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>51</fl><hrb>6</hrb><wdy>88</wdy><adj>M </adj></row><row num="14"><sta_id>421702</sta_id><sta_nm>BRUIN POINT</sta_nm><latitude>  39.6083</latitude><longitude>-110.2917</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G3P2</msgc><one_hr>6</one_hr><ten_hr>7</ten_hr><hu_hr>11</hu_hr><th_hr>13</th_hr><xh_hr>4</xh_hr><ic>21</ic><kbdi>6</kbdi><sc>8</sc><ec>50</ec><bi>46</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>33</fl><hrb>6</hrb><wdy>101</wdy><adj>M </adj></row><row num="15"><sta_id>422002</sta_id><sta_nm>FLATTOP</sta_nm><latitude>  39.3375</latitude><longitude>-110.6000</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G1P1</msgc><one_hr>7</one_hr><ten_hr>7</ten_hr><hu_hr>9</hu_hr><th_hr>8</th_hr><xh_hr>-1</xh_hr><ic>11</ic><kbdi>507</kbdi><sc>3</sc><ec>69</ec><bi>35</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>25</fl><hrb>7</hrb><wdy>71</wdy><adj>M </adj></row><row num="16"><sta_id>422102</sta_id><sta_nm>BRYSON</sta_nm><latitude>  39.2750</latitude><longitude>-109.2167</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G3P2</msgc><one_hr>6</one_hr><ten_hr>7</ten_hr><hu_hr>9</hu_hr><th_hr>9</th_hr><xh_hr>0</xh_hr><ic>23</ic><kbdi>561</kbdi><sc>10</sc><ec>65</ec><bi>60</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>43</fl><hrb>6</hrb><wdy>68</wdy><adj>M </adj></row><row num="17"><sta_id>422710</sta_id><sta_nm>NORTH LONG POINT</sta_nm><latitude>  37.8381</latitude><longitude>-109.8389</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G3P2</msgc><one_hr>3</one_hr><ten_hr>5</ten_hr><hu_hr>9</hu_hr><th_hr>10</th_hr><xh_hr>1</xh_hr><ic>44</ic><kbdi>184</kbdi><sc>11</sc><ec>67</ec><bi>63</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>45</fl><hrb>3</hrb><wdy>73</wdy><adj>M </adj></row><row num="18"><sta_id>422711</sta_id><sta_nm>BIG INDIAN</sta_nm><latitude>  38.2208</latitude><longitude>-109.2792</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G1P1</msgc><one_hr>5</one_hr><ten_hr>6</ten_hr><hu_hr>9</hu_hr><th_hr>8</th_hr><xh_hr>-3</xh_hr><ic>17</ic><kbdi>528</kbdi><sc>4</sc><ec>71</ec><bi>38</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>27</fl><hrb>5</hrb><wdy>72</wdy><adj>M </adj></row><row num="19"><sta_id>422712</sta_id><sta_nm>KANE GULCH</sta_nm><latitude>  37.5250</latitude><longitude>-109.8917</longitude><nfdr_dt>11/24/2017</nfdr_dt><nfdr_tm>12</nfdr_tm><nfdr_type>O</nfdr_type><mp>1</mp><msgc>7G1P1</msgc><one_hr>5</one_hr><ten_hr>6</ten_hr><hu_hr>11</hu_hr><th_hr>9</th_hr><xh_hr>0</xh_hr><ic>30</ic><kbdi>468</kbdi><sc>9</sc><ec>67</ec><bi>56</bi><sl>3 </sl><lr>0</lr><lo>0</lo><hr>0</hr><ho>0</ho><fl>40</fl><hrb>5</hrb><wdy>76</wdy><adj>M </adj></row></nfdrs>' ;

// // var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
// // // var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
// // // console.log(result1, '\n', result2);
// // console.log(result1);