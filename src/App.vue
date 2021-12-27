<template>
  <div id="app">
    <div class="container">
    <div class="row">
      <!-- 左邊選單 -->
      <div class="col-md-3 header">
        <div class="py-5 px-10 px-md-0 h-100 w-100">
          <a href="#" class="d-block w-100 text-center text-md-start">
            <img class="mb-5" src="./assets/images/logo/LOGO.svg" alt="logo" style="width:116px;">
          </a>
        <div class="position-relative mb-5">
          <select class="w-100 px-5 py-3 form-control" name="place" id="searchPlace" v-model="selected" @click="getScenicSpotData">
            <option value="" selected> --請選擇城市--</option>
            <option v-for="city in cityData" :key="city.CityID" :value="city.City">
              {{ city.CityName }}</option>
          </select>
          <a href="#" class="d-flex rounded-circle btn-primary link-white justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y me-5" style="width:20px; height:20px; pointer-events: none;">
            <span class="material-icons-outlined d-block">
              expand_more
            </span>
          </a>
        </div>
        <div class="position-relative">
          <input class="w-100 px-5 py-3 form-control" type="text" name="keywords" id="searchKeywords" placeholder="--關鍵字搜尋--" v-model="keyword">
          <a href="#" class="d-flex rounded-circle btn-outline-primary justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y me-2" style="width:35px; height:35px;">
            <span class="material-icons-outlined d-block">
              search
            </span>
          </a>
        </div>
         <div class="pb-5 border-light border-bottom border-1 mb-5">
        </div>
        <h3 class="fw-bold fs-7 mb-5">精選主題</h3>
        <ul class="d-flex flex-wrap justify-content-center gap-3">
          <li>
            <a href="#" class="btn">
            <img class="mb-2" src="./assets/images/icon/historical.svg" alt="img">
              <p>歷史文化</p>
            </a>
          </li>
          <li>
            <a href="#" class="btn">
            <img class="mb-2" src="./assets/images/icon/bike.svg" alt="img">
              <p>戶外踏青</p>
            </a>
          </li>
          <li>
            <a href="#" class="btn">
            <img class="mb-2" src="./assets/images/icon/believe.svg" alt="img">
              <p>宗教巡禮</p>
            </a>
          </li>
          <li>
            <a href="#" class="btn">
            <img class="mb-2" src="./assets/images/icon/activities.svg" alt="img">
              <p>親子活動</p>
            </a>
          </li>
          <li>
            <a href="#" class="btn">
            <img class="mb-2" src="./assets/images/icon/attractions.svg" alt="img">
              <p>風景區</p>
            </a>
          </li>
          <li>
            <a href="#" class="btn">
            <img class="mb-2" src="./assets/images/icon/food.svg" alt="img">
              <p>美食品嚐</p>
            </a>
          </li>
          <li>
            <a href="#" class="btn">
            <img class="mb-2" src="./assets/images/icon/hotel.svg" alt="img">
              <p>住宿推薦</p>
            </a>
          </li>
          <li>
            <a href="#" class="btn">
            <img class="mb-2" src="./assets/images/icon/visits.svg" alt="img">
              <p>觀光活動</p>
            </a>
          </li>
        </ul>
        </div>
      </div>
      <!-- 右邊主題欄位 -->
      <div class="col-md-9 overflow-auto">
        <div class="py-10">
          <img class="img-fluid mb-10" src="./assets/images/logo/banner.png" alt="banner">
          <div class="px-5">
          <div class="d-flex justify-content-between align-items-center mb-5">
            <div class="d-flex">
              <span class="material-icons text-third me-1">
                place
              </span>
              <h2 class="fs-5">熱門景點</h2>
            </div>
            <a href="#" class="link-primary" @click.prevent="addShowDataQnt">更多熱門景點</a>
          </div>
          <ul class="row mb-8">
            <li class="col-md-4 mb-5" v-for="s in scenicSpotData"
              :key="s.ID">
              <div class="card border-0 rounded-3 position-relative shadow h-100">
                <img v-if="s.Picture.hasOwnProperty('PictureUrl1')" :src="s.Picture.PictureUrl1" :alt="s.Picture.PictureDescription1" class="card-img-obj rounded-top-3 h-40">
                <img v-else src="@/assets/images/img.png" alt="img" class="card-img-obj rounded-top-3 h-40">
                <a href="#" class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3">
                  share
                </a>
                <div class="px-3 py-2 text-break">
                  <h3 class="fs-7 fw-bold mb-3">{{s.Name}}</h3>
                    <div class="d-flex flex-wrap text-nowrap gap-3">
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        place
                      </span>
                      <p class="fs-8"> {{ s.City }}</p>
                      </div>
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        watch_later
                      </span>
                      <p v-if="s.OpenTime.textContent.contains('全年皆可') || s.OpenTime.contains('每日')" class="fs-8">全日開放 {{s.OpenTime.split('，')[1]}}</p>
                      <p v-else-if="s.OpenTime.length === 0" class="fs-8">全日開放</p>
                      <p v-else class="fs-8">請點擊查看詳情</p>
                      </div>
                      <div class="d-flex me-3" v-if="s.Class1">
                      <span class="material-icons text-primary me-1">
                        local_offer
                      </span>
                      <ul class="d-flex">
                        <li v-if="s.Class1" class="badge bg-primary fs-8">{{ s.Class1 }}</li>
                        <li v-if="s.Class2" class="badge bg-primary fs-8">{{ s.Class2 }}</li>
                        <li v-if="s.Class3" class="badge bg-primary fs-8">{{ s.Class3 }}</li>
                      </ul>
                      </div>
                    </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="d-flex justify-content-between align-items-center mb-5">
            <div class="d-flex">
              <span class="material-icons text-third me-1">
                place
              </span>
              <h2 class="fs-5">觀光活動</h2>
            </div>
            <a href="#" class="link-primary" @click.prevent="addShowDataQnt">更多觀光活動</a>
          </div>
          <ul class="row mb-8">
            <li class="col-md-4 mb-5"  v-for="a in activityData"
              :key="a.ID">
              <div class="card border-0 rounded-3 position-relative shadow">
                <img v-if="a.Picture.length !== 0" :src="a.Picture.PictureUrl1" :alt="a.Picture.PictureDescription1" class="card-img-obj rounded-top-3 h-40">
                <img v-else src="@/assets/images/img.png" alt="img" class="card-img-obj rounded-top-3 h-40">
                <a href="#" class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3">
                  share
                </a>
                <div class="px-3 py-2 text-break">
                  <h3 class="fs-7 fw-bold mb-3">{{ a.Name }}</h3>
                      <div class="d-flex me-3 mb-3">
                      <span class="material-icons text-primary me-1">
                        watch_later
                      </span>
                      <p class="fs-8">{{ a.StartTime }} ~ {{ a.EndTime }}</p>
                      </div>
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        place
                      </span>
                      <p class="fs-8">{{ a.Location }}</p>
                      </div>
                      <div class="d-flex me-3" v-if="s.Class1">
                      <span class="material-icons text-primary me-1">
                        local_offer
                      </span>
                      <ul class="d-flex">
                        <li v-if="s.Class1" class="badge bg-primary fs-8">{{ s.Class1 }}</li>
                        <li v-if="s.Class2" class="badge bg-primary fs-8">{{ s.Class2 }}</li>
                      </ul>
                      </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="d-flex justify-content-between align-items-center mb-5">
            <div class="d-flex">
              <span class="material-icons text-third me-1">
                place
              </span>
              <h2 class="fs-5">美食品嚐</h2>
            </div>
            <a href="#" class="link-primary" @click.prevent="addShowDataQnt">更多美食品嚐</a>
          </div>
          <ul class="row mb-8">
            <li class="col-md-4"  v-for="r in restaurantData"
              :key="r.ID">
              <div class="card border-0 rounded-3 position-relative shadow">
                <img v-if="r.Picture.length !== 0" :src="r.Picture.PictureUrl1" :alt="r.Picture.PictureDescription1" class="card-img-obj rounded-top-3 h-40">
                <img v-else src="@/assets/images/img.png" alt="img" class="card-img-obj rounded-top-3 h-40">
                <a href="#" class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3">
                  share
                </a>
                <div class="px-3 py-2 text-break">
                  <h3 class="fs-7 fw-bold mb-3">{{ r.Name }}</h3>
                      <div class="d-flex me-3 mb-3">
                      <span class="material-icons text-primary me-1">
                        watch_later
                      </span>
                       <p v-if="r.OpenTime.textContent.contains('全年皆可') || r.OpenTime.contains('每日')" class="fs-8">全日開放 {{r.OpenTime.split('，')[1]}}</p>
                      <p v-else-if="r.OpenTime.length === 0" class="fs-8">全日開放</p>
                      <p v-else class="fs-8">請點擊查看詳情</p>
                      </div>
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        place
                      </span>
                      <p class="fs-8">{{ r.Address }}</p>
                      </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="d-flex justify-content-between align-items-center mb-5">
            <div class="d-flex">
              <span class="material-icons text-third me-1">
                place
              </span>
              <h2 class="fs-5">住宿推薦</h2>
            </div>
            <a href="#" class="link-primary" @click.prevent="addShowDataQnt">更多住宿推薦</a>
          </div>
          <ul class="row mb-8">
            <li class="col-md-4"  v-for="h in hotelData"
              :key="h.ID">
              <div class="card border-0 rounded-3 position-relative shadow">
                <img v-if="h.Picture.length !== 0" :src="h.Picture.PictureUrl1" :alt="h.Picture.PictureDescription1" class="card-img-obj rounded-top-3 h-40">
                <img v-else src="@/assets/images/img.png" alt="img" class="card-img-obj rounded-top-3 h-40">
                <a href="#" class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3">
                  share
                </a>
                <div class="px-3 py-2 text-break">
                  <h3 class="fs-7 fw-bold mb-3">{{ h.Name}}</h3>
                      <div class="d-flex me-3 mb-3">
                      <span class="material-icons text-primary me-1">
                        call
                      </span>
                      <p class="fs-8">{{ h.Phone }}</p>
                      </div>
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        place
                      </span>
                      <p class="fs-8">{{ h.City }}</p>
                      </div>
                </div>
              </div>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import city from '@/data/city.json'
import JsSHA from 'jssha'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      cityData: city,
      selected: '',
      keyword: '',
      qntShow: 3,
      scenicSpotTotalData: [],
      scenicSpotData: [],
      activityTotalData: [],
      activityData: [],
      restaurantTotalData: [],
      restaurantData: [],
      hotelTotalData: [],
      hotelData: []
    }
  },
  methods: {
     getData () {
      if (this.selected !== '') {
        this.getScenicSpotData()
        this.getActivityData()
        this.getRestaurantData()
        this.getHotelData()
      }
    },
    getScenicSpotData () {
      const currentCity = this.selected
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.scenicSpotTotalData = res.data
          this.scenicSpotTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          this.scenicSpotData.push(this.scenicSpotTotalData.slice(0, this.scenicSpotTotalData.length - this.qntShow))
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getActivityData () {
      const currentCity = this.selected
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.activityTotalData = res.data
          this.activityTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          this.activityData.push(this.activityTotalData.slice(0, this.activityTotalData.length - this.qntShow))
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getRestaurantData () {
      const currentCity = this.selected
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.restaurantTotalData = res.data
          this.restaurantTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          this.restaurantData.push(this.restaurantTotalData.slice(0, this.restaurantTotalData.length - this.qntShow))
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getHotelData () {
      const currentCity = this.selected
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.hotelTotalData = res.data
          this.hotelTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          this.hotelData.push(this.hotelTotalData.slice(0, this.hotelTotalData.length - this.qntShow))
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    addShowDataQnt () {
      this.qntShow += this.qntShow
    },
    getAuthorizationHeader () {
      const AppID = 'bbbf44c0e2534c17bbf5553afe5cfb24'
      const AppKey = 'YLongjG_6wqXgBm5FQ4LIpW7bPQ'
      const GMTString = new Date().toGMTString()
      const ShaObj = new JsSHA('SHA-1', 'TEXT')
      ShaObj.setHMACKey(AppKey, 'TEXT')
      ShaObj.update('x-date: ' + GMTString)
      const HMAC = ShaObj.getHMAC('B64')
      const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`
      return { Authorization: Authorization, 'X-Date': GMTString }
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Material+Icons');
  @import url('https://fonts.googleapis.com/css2?family=Material+Icons+Outlined');
  @import './assets/scss/all.scss';
</style>
