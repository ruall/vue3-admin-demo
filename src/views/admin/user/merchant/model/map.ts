import { reactive } from 'vue'
import axios from 'axios'

function Maps() {
  let center = reactive({ lat: 41.893056, lng: 12.482778 })
  const markers = reactive({
    id: 'dfsldjl3r',
    position: {
      lat: 41.893056,
      lng: 12.482778
    },
    pointInfo: ''
  })
  const addMarker = async (e: any) => {
    markers.position.lat = e.latLng.lat()
    markers.position.lng = e.latLng.lng()
    const latLngData = e.latLng.lat().toFixed(6) + ',' + e.latLng.lng().toFixed(6)
    // @ts-ignore
    axios({
      type: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLngData}&key=AIzaSyDnRYn-WdzOaAao38l2-WrfblfaUBcockI`
    }).then((res) => {
      if (res.data.results.length > 0) {
        markers.pointInfo = res.data.results[0].formatted_address
      } else {
        markers.pointInfo = res.data.plus_code.compound_code
      }
    })
  }
  return { center, markers, addMarker }
}

export default Maps
