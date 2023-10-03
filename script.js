const display = document.getElementById("display");
const ipData = document.getElementById("ipData");
const dataPage = document.getElementById("dataPage");
const actBtn = document.getElementById("actBtn");
var ip;

function getIP() {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
        ip = data.ip;
      ipData.innerHTML = "";
      ipData.innerHTML = `
            <h1 id="ipData">Your Current IP Address is <span>${ip}</span></h1>
        `;
    });
}

getIP();

actBtn.addEventListener("click", () => {
    fetch(`https://ipinfo.io/${ip}?token=555e415a75298b`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        
        displayData(data);
    });
});

function displayData(data) {
    let ipArr = data.loc.split(',');
    let latitude = ipArr[0];
    let longitude = ipArr[1];
    display.style.display = 'none';
    let div = document.createElement('div');
    console.log(data);
    div.innerHTML = '';
    div.className = "col1";
    div.innerHTML = `
    <h1>IP Address : <span>${data.ip}</span></h1>
        <table>
            <tr>
                <td>Lat: <span>${latitude}</span></td>
                <td>City: <span>${data.city}</span></td>
                <td>Organisation: <span>${data.org}</span></td>
            </tr>
            <tr>
                <td>Long: <span>${longitude}</span></td>
                <td>Region: <span>${data.region}</span></td>
                <td>Hostname: <span>${data.hostname}</span></td>
            </tr>
        </table>
    `;
    dataPage.appendChild(div);
    displayMap(ipArr[0], ipArr[1], data);
}
function displayMap(latitude, longitude, data) {
    let map = document.createElement('div');
    map.innerHTML = `
    <div class="map">
    <h2>Your Current Location</h2>
        <iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&output=embed" 
            width="95%%"
            height="90%"
        ></iframe>
    </div>`;
    dataPage.appendChild(map);
    moreInfo(data);
  }

function moreInfo(data) {
    let div = document.createElement('div');
    div.className = "col1";
    div.innerHTML = `
    <h2><span>More Information About You</span></h2>
        <table>
            <tr>
                <td>Time Zone: <span>${data.timezone}</span></td>
            </tr>
            <tr>
                <td>Date And Time: <span>${new Date()}</span></td>
            </tr>
            <tr>
                <td>Pincode: <span>${data.postal}</span></td>
            </tr>
            <tr>
                <td>Message: <span>${0}</span></td>
            </tr>

        </table>
    `;
    dataPage.appendChild(div);
}