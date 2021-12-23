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
          <select class="w-100 px-5 py-3 form-control" name="place" id="searchPlace" v-model="selected">
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
            <a href="#" class="link-primary">更多熱門景點</a>
          </div>
          <ul class="row mb-8">
            <li class="col-md-4">
              <div class="card border-0 rounded-3 position-relative shadow">
                <img src="https://images.unsplash.com/photo-1559537696-0da4f948c83f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2081&q=80" alt="img" class="card-img-obj rounded-top-3">
                <a href="#" class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3">
                  share
                </a>
                <div class="px-3 py-2">
                  <h3 class="fs-7 fw-bold mb-3">天長地久橋</h3>
                  <div class="d-flex">
                    <div class="d-flex flex-wrap text-nowrap gap-3">
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        place
                      </span>
                      <p class="fs-8">嘉義縣</p>
                      </div>
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        watch_later
                      </span>
                      <p class="fs-8">每日開放</p>
                      </div>
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
            <a href="#" class="link-primary">更多觀光活動</a>
          </div>
          <ul class="row mb-8">
            <li class="col-md-4">
              <div class="card border-0 rounded-3 position-relative shadow">
                <img src="https://images.unsplash.com/photo-1559537696-0da4f948c83f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2081&q=80" alt="img" class="card-img-obj rounded-top-3">
                <a href="#" class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3">
                  share
                </a>
                <div class="px-3 py-2">
                  <h3 class="fs-7 fw-bold mb-3">2021臺北燈節</h3>
                      <div class="d-flex me-3 mb-3">
                      <span class="material-icons text-primary me-1">
                        watch_later
                      </span>
                      <p class="fs-8">2021-12-17 ~ 2021-12-26</p>
                      </div>
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        place
                      </span>
                      <p class="fs-8">臺北市 萬華區</p>
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
            <a href="#" class="link-primary">更多美食品嚐</a>
          </div>
                    <ul class="row mb-8">
            <li class="col-md-4">
              <div class="card border-0 rounded-3 position-relative shadow">
                <img src="https://images.unsplash.com/photo-1559537696-0da4f948c83f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2081&q=80" alt="img" class="card-img-obj rounded-top-3">
                <a href="#" class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3">
                  share
                </a>
                <div class="px-3 py-2">
                  <h3 class="fs-7 fw-bold mb-3">2021臺北燈節</h3>
                      <div class="d-flex me-3 mb-3">
                      <span class="material-icons text-primary me-1">
                        watch_later
                      </span>
                      <p class="fs-8">週一~週五：10:00~15:00（週二公休）<br>週六~週日：10:00~21:00</p>
                      </div>
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        place
                      </span>
                      <p class="fs-8">臺南市724七股區中寮里8-41號（七股鹽山光復國小旁）</p>
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
            <a href="#" class="link-primary">更多住宿推薦</a>
          </div>
                    <ul class="row mb-8">
            <li class="col-md-4">
              <div class="card border-0 rounded-3 position-relative shadow">
                <img src="https://images.unsplash.com/photo-1559537696-0da4f948c83f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2081&q=80" alt="img" class="card-img-obj rounded-top-3">
                <a href="#" class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3">
                  share
                </a>
                <div class="px-3 py-2">
                  <h3 class="fs-7 fw-bold mb-3">2021臺北燈節</h3>
                      <div class="d-flex me-3 mb-3">
                      <span class="material-icons text-primary me-1">
                        call
                      </span>
                      <p class="fs-8">886-4-25855997</p>
                      </div>
                      <div class="d-flex me-3">
                      <span class="material-icons text-primary me-1">
                        place
                      </span>
                      <p class="fs-8">臺北市 萬華區</p>
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
// import jsSHA from 'jssha'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      cityData: city,
      selected: '',
      keyword: ''
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Material+Icons');
  @import url('https://fonts.googleapis.com/css2?family=Material+Icons+Outlined');
  @import './assets/scss/all.scss';
</style>
