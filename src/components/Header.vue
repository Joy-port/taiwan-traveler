<template>
  <div class="header">
    <div class="py-5 px-10 px-md-0 h-100 w-100">
        <div class="d-flex justify-content-between">
            <router-link to="/" class="d-block w-100 text-center text-md-start">
                <img class="mb-5" src="./assets/images/logo/LOGO.svg" alt="logo" style="width:116px;">
            </router-link>
            <button class="btn btn-outline-primary material-icons">        
                chevron_left
            </button>
        </div>
        <div class="position-relative mb-5">
          <select class="w-100 px-5 py-3 form-control" name="place" id="searchPlace" v-model="searchMode" @click="searchMode">
            <option value="" selected> 請選擇類別（必填）</option>
            <option  v-for="t in typeData" :key="t.en" :value="t.en" >{{ t.name }}</option>
          </select>
          <div class="d-flex rounded-circle btn-primary link-white justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y me-5" style="width:20px; height:20px; pointer-events: none;">
            <span class="material-icons-outlined d-block">
              expand_more
            </span>
          </div>
        </div>
        <div class="position-relative mb-5">
          <select class="w-100 px-5 py-3 form-control" name="place" id="searchPlace" v-model="selectedCity" @click="getCityName">
            <option value="" selected> 請選擇城市（選填）</option>
            <option v-for="city in cityData" :key="city.CityID" :value="city.City">
              {{ city.CityName }}</option>
          </select>
          <div class="d-flex rounded-circle btn-primary link-white justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y me-5" style="width:20px; height:20px; pointer-events: none;">
            <span class="material-icons-outlined d-block">
              expand_more
            </span>
          </div>
        </div>
        <div class="position-relative mb-5">
          <input class="w-100 px-5 py-3 form-control" type="text" name="keywords" id="searchKeywords" placeholder=" 關鍵字搜尋（選填）" v-model="keyword" @keypress.enter="goSearch()">
          <a href="#" class="d-flex rounded-circle btn-outline-primary justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y me-2" style="width:35px; height:35px;" @click="goSearch()">
            <span class="material-icons-outlined d-block">
              search
            </span>
          </a>
        </div>
        <button class="btn btn-primary w-100 rounded-3" @click="goSearch()">開始搜尋</button>
         <div class="pb-5 border-light border-bottom border-1 mb-5">
        </div>
        <h3 class="fw-bold fs-7 mb-5">精選主題</h3>
        <ul class="d-flex flex-wrap justify-content-center gap-3">
          <li class="btn"  @click="goSearch('ScenicSpot', false, '觀光,遊憩')">
            <img class="mb-2" src="./assets/images/icon/bike.svg" alt="觀光遊憩">
            <p>觀光遊憩</p>
          </li>
          <li class="btn"  @click="goSearch('ScenicSpot', false, '自然,風景')">
            <img class="mb-2" src="./assets/images/icon/attractions.svg" alt="自然風景">
              <p>自然風景</p>
          </li>
        <li class="btn" @click="goSearch('Restaurant', false, '地方特產')">
            <img class="mb-2" src="./assets/images/icon/activities.svg" alt="地方特產">
              <p>地方特產</p>
          </li>
          <li class="btn" @click="goSearch('Restaurant', false, '異國料理')">
            <img class="mb-2" src="./assets/images/icon/food.svg" alt="異國料理">
              <p>異國料理</p>
          </li>
          <li class="btn" @click="goSearch('Hotel', false, '度假,民宿')">
            <img class="mb-2" src="./assets/images/icon/hotel.svg" alt="青旅民宿">
              <p>青旅民宿</p>
          </li>
          <li class="btn" @click="goSearch('Hotel', false, '國際,旅館')">
            <img class="mb-2" src="./assets/images/icon/believe.svg" alt="飯店旅館">
              <p>飯店旅館</p>
          </li>
          <li class="btn" @click="goSearch('Activity', false, '節慶活動')">
            <img class="mb-2" src="./assets/images/icon/historical.svg" alt="節慶活動">
              <p>節慶活動</p>
          </li>
          <li class="btn" @click="goSearch('Activity', false, '藝文,體驗')">
            <img class="mb-2" src="./assets/images/icon/visits.svg" alt="藝文體驗">
              <p>藝文體驗</p>
          </li>
        </ul>
        </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { cityList, typeList } from "../data.js";

export default {
    name: "Header",
    props: {getTypeName: Function, getCityName:Function},
    setup(props) {
        const cityName = (city) => cityList[city].name
        const typeName = computed(() => typeList[searchMode.value])
    }
}
</script>