let ip = '';
let arr = [];
let api = `https://ipinfo.io/${ip}?token=555e415a75298b`;

let liveip = document.getElementById('liveip');


async function apicall() {
    try {
        let response = await fetch(api);
        let result = await response.json();
        liveip.innerText=result.ip;
        arr.push(result);
        localStorage.setItem('data',JSON.stringify(arr));
    } catch (error) {
        console.error("Error fetching IP info:", error);
        alert("cant get ur live data");
    }
}

apicall();

let getstart = document.getElementById('getstart');
getstart.addEventListener('click', async () => {
    await apicall(); 
    window.location.href = "./secondPage/index.html";
});