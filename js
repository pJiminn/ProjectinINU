var map;
var redMarker;
var triangleMarker;

var serial;

function setup() {
  noCanvas();
  var portName = "/dev/cu.usbmodem11401"; // 시리얼 포트

  serial = new p5.SerialPort();
  // serial.on('list', printList);
  serial.on("data", serialEvent);
  //serial.list();
  serial.open(portName);

  map = L.map("mapid").setView([36.68894, 128.53375], 20);

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // 빨간색 세모 마커 아이콘 정의
  redMarker = L.divIcon({
    className: "custom-marker",
    html:
      '<div style="width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-bottom: 40px solid red;"></div>',
    iconSize: [1, 4],
    iconAnchor: [8, 20],
  });

  // 클릭 이벤트 리스너 추가
  // triangleMarker.on("click", function () {
  //   triangleMarker
  //     .bindPopup("N.36.68799° , E.128.53282°", { offset: [0, -15] })
  //     .openPopup();
  // });
}

function serialEvent() {
  // 시리얼 데이터가 들어올 때 호출되는 함수
  var data = serial.readLine(); // 시리얼 데이터 읽기
  print(data);
  if (data) {
    // 데이터를 처리하여 위도 및 경도로 변환
    var values = data.split(":"); // 쉼표로 데이터 분리
    if (values.length == 4) {
      var slaveID = parseFloat(values[0]);
      var slaveNumber = parseFloat(values[1]);
      var trigger = parseFloat(values[2]);
      var GPGLL = parseFloat(values[3]);
      
      
      var GPLvalue = values[3].split(",");
      var latitude = parseFloat(GPLvalue[1]);
      var longitude = parseFloat(GPLvalue[2]);

      if (!latitude)
        latitude = 36.68799;
      
      if (!longitude)
        longitude = 128.53282;
      
      // Leaflet 지도에 새로운 마커 추가
      if (trigger == 1) {
        triangleMarker = L.marker([36.68799, 128.53282], {
          icon: redMarker,
        }).addTo(map);
        triangleMarker.on("click", function () {
          triangleMarker
            .bindPopup("N.36.68799° , E.128.53282°", { offset: [0, -15] })
            .openPopup();
        });
      } else {
        L.marker([latitude, longitude]).addTo(map);
      }
    }
  }
}

/*
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    if (portList[i].indexOf('usbmodem') !== -1) {
      // 시리얼 포트가 "usbmodem"을 포함하는 경우를 찾음
      serial.open(portList[i]);
    }
  }
}*/

setInterval(function () {
 
}, 1000); // 1초 간격으로 위치 데이터를 요청
function draw() {
  // 이 부분은 비워둡니다.
}
