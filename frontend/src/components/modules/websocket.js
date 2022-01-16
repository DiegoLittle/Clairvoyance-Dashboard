import React,{useEffect,useState} from 'react'



const websocket = () => {
    const [gasPrice,setGasPrice]=useState(null)
    useEffect(() => {
        function handlePriceChange(data){
            console.log(data)
            setGasPrice(data)
            // if (data.type) {
            //   updatePageGasPriceData(data.data)
            // }
    
          }

        let wsObj = new WebSocket("wss://www.gasnow.org/ws/gasprice")
        wsObj.onopen = (evt) => {
            console.log("Connection open ...");
        };

      wsObj.onmessage = (evt) => {
        const dataStr = evt.data;
        const data = JSON.parse(dataStr);
        handlePriceChange(data)
      };

      return function cleanup() {
        wsObj.close()
        wsObj.onclose = (evt) => {
            console.log("Connection closed.");
          };
      };

    }, [])
    return (
        <div className="border p-2 m-2 rounded-xl w-1/6">
            <div>Standard: {gasPrice ? gasPrice.data.standard*0.000000001 : ""}</div>
            <div>Fast: {gasPrice ? gasPrice.data.fast*0.000000001 : ""}</div>
        </div>
    )
}

export default websocket
