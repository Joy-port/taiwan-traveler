<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <!-- 左邊選單 -->
        <div class="col-md-3 header">
          <div class="py-5 px-10 px-md-0 h-100 w-100">
            <div class="d-flex justify-content-between align-items-center mb-5">
              <router-link
                to="/"
                class="d-block w-100 text-center text-md-start"
              >
                <img
                  src="./assets/images/logo/LOGO.svg"
                  alt="logo"
                  style="width: 116px"
                />
              </router-link>
              <button class="btn btn-outline-primary border-0 rounded-circle material-icons fs-6 h-20">
                chevron_left
              </button>
            </div>
            <div class="position-relative mb-5">
              <select
                class="w-100 px-5 py-3 form-control"
                name="type"
                id="searchType"
                v-model="selectedType"
                @click="getTypeName"
              >
                <option value="" selected>請選擇類別（必填）</option>
                <option v-for="t in typeData" :key="t.en" :value="t.en">
                  {{ t.name }}
                </option>
              </select>
              <div
                class="d-flex rounded-circle btn-primary link-white justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y me-5"
                style="width: 20px; height: 20px; pointer-events: none"
              >
                <span class="material-icons-outlined d-block">
                  expand_more
                </span>
              </div>
            </div>
            <div class="position-relative mb-5">
              <select
                class="w-100 px-5 py-3 form-control"
                name="place"
                id="searchPlace"
                v-model="selectedCity"
                @click="getCityName"
              >
                <option value="" selected>請選擇城市（選填）</option>
                <option
                  v-for="city in cityData"
                  :key="city.CityID"
                  :value="city.City"
                >
                  {{ city.CityName }}
                </option>
              </select>
              <div
                class="d-flex rounded-circle btn-primary link-white justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y me-5"
                style="width: 20px; height: 20px; pointer-events: none"
              >
                <span class="material-icons-outlined d-block">
                  expand_more
                </span>
              </div>
            </div>
            <div class="position-relative mb-5">
              <input
                class="w-100 px-5 py-3 form-control"
                type="text"
                name="keywords"
                id="searchKeywords"
                placeholder=" 關鍵字搜尋（選填）"
                v-model.lazy="keyword"
              />
              <a
                href="#"
                class="d-flex rounded-circle btn-outline-primary justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y me-2"
                style="width: 35px; height: 35px"
                @click="goSearch()"
              >
                <span class="material-icons-outlined d-block"> search </span>
              </a>
            </div>
            <button class="btn btn-primary w-100 rounded-3" @click="goSearch(selectedType, selectedCity, keyword )">
              開始搜尋
            </button>
            <div class="pb-5 border-light border-bottom border-1 mb-5"></div>
            <h3 class="fw-bold fs-7 mb-5">精選主題</h3>
            <ul class="d-flex flex-wrap justify-content-center gap-3">
              <li
                class="btn"
                @click="goSearch('ScenicSpot', selectedCity, '觀光,遊憩')"
              >
                <img
                  class="mb-2"
                  src="./assets/images/icon/bike.svg"
                  alt="觀光遊憩"
                />
                <p>觀光遊憩</p>
              </li>
              <li
                class="btn"
                @click="goSearch('ScenicSpot', selectedCity, '自然,風景')"
              >
                <img
                  class="mb-2"
                  src="./assets/images/icon/attractions.svg"
                  alt="自然風景"
                />
                <p>自然風景</p>
              </li>
              <li
                class="btn"
                @click="goSearch('Restaurant', selectedCity, '地方特產')"
              >
                <img
                  class="mb-2"
                  src="./assets/images/icon/activities.svg"
                  alt="地方特產"
                />
                <p>地方特產</p>
              </li>
              <li
                class="btn"
                @click="goSearch('Restaurant', selectedCity, '異國料理')"
              >
                <img
                  class="mb-2"
                  src="./assets/images/icon/food.svg"
                  alt="異國料理"
                />
                <p>異國料理</p>
              </li>
              <li class="btn" @click="goSearch('Hotel', selectedCity, '度假,民宿')">
                <img
                  class="mb-2"
                  src="./assets/images/icon/hotel.svg"
                  alt="青旅民宿"
                />
                <p>青旅民宿</p>
              </li>
              <li class="btn" @click="goSearch('Hotel', selectedCity, '國際,旅館')">
                <img
                  class="mb-2"
                  src="./assets/images/icon/believe.svg"
                  alt="飯店旅館"
                />
                <p>飯店旅館</p>
              </li>
              <li class="btn" @click="goSearch('Activity', selectedCity, '節慶活動')">
                <img
                  class="mb-2"
                  src="./assets/images/icon/historical.svg"
                  alt="節慶活動"
                />
                <p>節慶活動</p>
              </li>
              <li class="btn" @click="goSearch('Activity', selectedCity, '藝文,體驗')">
                <img
                  class="mb-2"
                  src="./assets/images/icon/visits.svg"
                  alt="藝文體驗"
                />
                <p>藝文體驗</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 右邊主題欄位 -->
        <div class="col-md-9 overflow-auto">
          <div class="py-10">
            <img
              class="img-fluid mb-10"
              src="./assets/images/logo/banner.png"
              alt="banner"
            />
            <div class="px-5">
              <div
                class="d-flex justify-content-between align-items-center mb-5"
              >
                <div class="d-flex">
                  <span class="material-icons text-third me-1"> place </span>
                  <h2 v-if="selectedName" class="fs-5"> {{selectedName}}
                    <span
                      v-if="selectedCityName"
                      class="badge bg-third fs-7 ms-3 fw-normal"
                      v-text="selectedCityName"
                      ></span
                    >
                  </h2>
                  <h2 v-else class="fs-5">旅遊景點</h2>
                </div>
                <a href="#" class="link-primary" @click.prevent="addShowDataQnt"
                  >更多{{ selectedName }}</a
                >
              </div>
              <ul class="row mb-8" v-if="selectedName === '熱門景點'">
                <router-link
                  class="col-md-4 mb-5"
                  v-for="s in selectedData"
                  :to="`/D/${s.ID}/`"
                  :key="s.ID"
                >
                  <div
                    class="card border-0 rounded-3 position-relative shadow h-100"
                  >
                    <img
                      v-if="s.Picture.hasOwnProperty('PictureUrl1')"
                      :src="s.Picture.PictureUrl1"
                      :alt="s.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-40"
                    />
                    <img
                      v-else
                      src="@/assets/images/img.png"
                      alt="img"
                      class="card-img-obj rounded-top-3 h-40"
                    />
                    <a
                      href="#"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ s.Name }}</h3>
                      <div class="d-flex flex-wrap text-nowrap gap-3">
                        <div class="d-flex me-3">
                          <span class="material-icons text-primary me-1">
                            place
                          </span>
                          <p class="fs-8">{{ s.City }}</p>
                        </div>
                        <div class="d-flex me-3">
                          <span class="material-icons text-primary me-1">
                            watch_later
                          </span>
                          <p
                            v-if="
                              s.OpenTime.textContent.contains('全年皆可') ||
                              s.OpenTime.contains('每日')
                            "
                            class="fs-8"
                          >
                            全日開放 {{ s.OpenTime.split('，')[1] }}
                          </p>
                          <p v-else-if="s.OpenTime.length === 0" class="fs-8">
                            全日開放
                          </p>
                          <p v-else class="fs-8">請點擊查看詳情</p>
                        </div>
                        <div class="d-flex me-3" v-if="s.Class1">
                          <span class="material-icons text-primary me-1">
                            local_offer
                          </span>
                          <ul class="d-flex">
                            <li v-if="s.Class1" class="badge bg-primary fs-8">
                              {{ s.Class1 }}
                            </li>
                            <li v-if="s.Class2" class="badge bg-primary fs-8">
                              {{ s.Class2 }}
                            </li>
                            <li v-if="s.Class3" class="badge bg-primary fs-8">
                              {{ s.Class3 }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </ul>
              <ul class="row mb-8" v-else-if="selectedName === '觀光活動'">
                <li class="col-md-4 mb-5" v-for="a in selectedData" :key="a.ID">
                  <div class="card border-0 rounded-3 position-relative shadow">
                    <img
                      v-if="a.Picture.length !== 0"
                      :src="a.Picture.PictureUrl1"
                      :alt="a.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-40"
                    />
                    <img
                      v-else
                      src="@/assets/images/img.png"
                      alt="img"
                      class="card-img-obj rounded-top-3 h-40"
                    />
                    <a
                      href="#"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
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
                          <li v-if="s.Class1" class="badge bg-primary fs-8">
                            {{ s.Class1 }}
                          </li>
                          <li v-if="s.Class2" class="badge bg-primary fs-8">
                            {{ s.Class2 }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="row mb-8" v-else-if="selectedName === '美食品嚐'">
                <li class="col-md-4" v-for="r in selectedData" :key="r.ID">
                  <div class="card border-0 rounded-3 position-relative shadow">
                    <img
                      v-if="r.Picture.length !== 0"
                      :src="r.Picture.PictureUrl1"
                      :alt="r.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-40"
                    />
                    <img
                      v-else
                      src="@/assets/images/img.png"
                      alt="img"
                      class="card-img-obj rounded-top-3 h-40"
                    />
                    <a
                      href="#"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ r.Name }}</h3>
                      <div class="d-flex me-3 mb-3">
                        <span class="material-icons text-primary me-1">
                          watch_later
                        </span>
                        <p
                          v-if="
                            r.OpenTime.textContent.contains('全年皆可') ||
                            r.OpenTime.contains('每日')
                          "
                          class="fs-8"
                        >
                          全日開放 {{ r.OpenTime.split('，')[1] }}
                        </p>
                        <p v-else-if="r.OpenTime.length === 0" class="fs-8">
                          全日開放
                        </p>
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
              <ul class="row mb-8" v-else>
                <li class="col-md-4" v-for="h in selectedData" :key="h.ID">
                  <div class="card border-0 rounded-3 position-relative shadow">
                    <img
                      v-if="h.Picture.length !== 0"
                      :src="h.Picture.PictureUrl1"
                      :alt="h.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-40"
                    />
                    <img
                      v-else
                      src="@/assets/images/img.png"
                      alt="img"
                      class="card-img-obj rounded-top-3 h-40"
                    />
                    <a
                      href="#"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ h.Name }}</h3>
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
import type from '@/data/type.json'
import JsSHA from 'jssha'

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      typeData: type,
      selectedType: '',
      selectedName: '',
      cityData: city,
      selectedCity: '',
      selectedCityName: '',
      keyword: '',
      qntShow: 3,
      selectedTotalData: [],
      selectedData: []
    }
  },
  computed: {
    nowCityName () {
      const filterCityName = this.cityData.filter((item) => {
        return item.City === this.selected
      })
      return filterCityName
    }
  },
  methods: {
    getCityName () {
      if (this.selectedCity) {
        const cityName = this.cityData.filter((item) => {
          return item.City === this.selectedCity
        })
        this.selectedCityName = cityName[0].CityName
      } else {
        this.selectedCityName = '臺灣'
      }
    },
    getTypeName () {
      const typeName = this.typeData.filter((item) => {
        return item.en === this.selectedType
      })
      this.selectedName = typeName[0].name
    },
    goSearch (selected, city, word = this.keyword.split(' ').join()) {
      this.selectedType = selected
      this.selectedCity = city
      this.keyword = word
    },
    getSearchResultData () {
      const currentCity = this.selectedCity
      const currentType = this.selectedType
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/${currentType}/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then((res) => {
          this.selectedTotalData = res.data
          this.selectedTotalData.forEach((item) => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          this.selectedData.push(
            this.selectedTotalData.slice(
              0,
              this.selectedTotalData.length - this.qntShow
            )
          )
        })
        .catch((err) => {
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
