<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <!-- 左邊選單 -->
        <div class="col-md-3 header">
          <div class="py-5 px-10 px-md-0 h-100 w-100">
            <div class="d-flex justify-content-between align-items-center mb-5">
              <a href="#" class="d-block w-100 text-center text-md-start">
                <img
                  src="./assets/images/logo/LOGO.svg"
                  alt="logo"
                  style="width: 116px"
                />
              </a>
              <button
                class="btn btn-outline-primary border-0 rounded-circle material-icons fs-6 h-20"
              >
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
                <option value="" selected>請選擇類別</option>
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
                <option value="" selected>請選擇城市</option>
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
              >
                <span class="material-icons-outlined d-block"> search </span>
              </a>
            </div>
            <button
              class="btn btn-primary w-100 rounded-3"
              @click="getSearchResultData"
            >
            <!-- :class="{'disabled':selectedData}" -->
              開始搜尋
            </button>
            <div class="pb-5 border-light border-bottom border-1 mb-5"></div>
            <h3 class="fw-bold fs-7 mb-5">精選主題</h3>
            <ul class="d-flex flex-wrap justify-content-center gap-3">
              <li
                class="btn"
                @click="goSearch('ScenicSpot', selectedCity, '體育健身類')"
              >
                <img
                  class="mb-2"
                  src="./assets/images/icon/bike.svg"
                  alt="體育健身"
                />
                <p>體育健身</p>
              </li>
              <li
                class="btn"
                @click="goSearch('ScenicSpot', selectedCity, '自然風景類')"
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
                @click="goSearch('Restaurant', selectedCity, '中式美食')"
              >
                <img
                  class="mb-2"
                  src="./assets/images/icon/activities.svg"
                  alt="中式美食"
                />
                <p>中式美食</p>
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
              <li class="btn" @click="goSearch('Hotel', selectedCity, '民宿')">
                <img
                  class="mb-2"
                  src="./assets/images/icon/hotel.svg"
                  alt="青旅民宿"
                />
                <p>青旅民宿</p>
              </li>
              <li
                class="btn"
                @click="goSearch('Hotel', selectedCity, '一般旅館')"
              >
                <img
                  class="mb-2"
                  src="./assets/images/icon/believe.svg"
                  alt="飯店旅館"
                />
                <p>飯店旅館</p>
              </li>
              <li
                class="btn"
                @click="goSearch('Activity', selectedCity, '節慶活動')"
              >
                <img
                  class="mb-2"
                  src="./assets/images/icon/historical.svg"
                  alt="節慶活動"
                />
                <p>節慶活動</p>
              </li>
              <li
                class="btn"
                @click="goSearch('Activity', selectedCity, '藝文活動')"
              >
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
            <!-- init 出現的資料 -->
            <div class="px-5" v-if="renderInit">
              <div
                class="d-flex justify-content-between align-items-center mb-5"
              >
                <div class="d-flex">
                  <span class="material-icons text-third me-1"> place </span>
                  <h2>熱門景點</h2>
                </div>
              </div>
              <ul class="row mb-8" v-if="spotData">
                <li
                  class="col-md-6 col-lg-4 mb-5"
                  v-for="spot in spotData"
                  :key="spot.ScenicSpotID"
                >
                  <div
                      class="card border-0 rounded-3 position-relative shadow h-100"
                    >
                    <img
                      v-if="spot.Picture.PictureUrl1"
                      :src="spot.Picture.PictureUrl1"
                      :alt="spot.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <a
                      v-if="spot.WebsiteUrl"
                      :href="spot.WebsiteUrl"
                      target="_blank"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ spot.ScenicSpotName }}</h3>
                      <div class="d-flex mb-3 me-3">
                        <span class="material-icons text-primary me-1">
                          place
                        </span>
                        <p class="fs-8">{{ spot.Address }}</p>
                      </div>
                      <div class="d-flex mb-3 me-3" v-if="spot.OpenTime">
                        <span class="material-icons text-primary me-1">
                          watch_later
                        </span>
                        <p class="fs-8">
                          {{ spot.OpenTime }}
                        </p>
                      </div>
                      <div class="d-flex me-3" v-if="spot.Class1">
                        <span class="material-icons text-primary me-1">
                          local_offer
                        </span>
                        <ul class="d-flex flex-wrap">
                          <li
                            v-if="spot.Class1"
                            class="badge bg-primary p-1 fs-8 mb-2 me-3 fw-light"
                          >
                            {{ spot.Class1 }}
                          </li>
                          <li
                            v-if="spot.Class2 && spot.Class2 !== spot.Class1"
                            class="badge bg-primary p-1 fs-8 mb-2 me-3 fw-light"
                          >
                            {{ spot.Class2 }}
                          </li>
                          <li
                            v-if="spot.Class3 && spot.Class3 !== spot.Class2"
                            class="badge bg-primary p-1 fs-8 mb-2 fw-light"
                          >
                            {{ spot.Class3 }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="d-flex justify-content-between align-items-center mb-5"
              >
                <div class="d-flex">
                  <span class="material-icons text-third me-1"> place </span>
                  <h2>觀光活動</h2>
                </div>
              </div>
              <ul class="row mb-8"  v-if="activityData">
                <li
                  class="col-md-6 col-lg-4 mb-5"
                  v-for="act in activityData"
                  :key="act.ActivityID"
                >
                  <div
                    class="card border-0 rounded-3 position-relative shadow h-100"
                  >
                    <img
                      v-if="act.Picture.PictureUrl1"
                      :src="act.Picture.PictureUrl1"
                      :alt="act.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <a
                      v-if="act.WebsiteUrl"
                      :href="act.WebsiteUrl"
                      target="_blank"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ act.ActivityName }}</h3>
                      <div class="d-flex me-3 mb-3">
                        <span class="material-icons text-primary me-1">
                          watch_later
                        </span>
                        <p class="fs-8">
                          {{ getRegTime(act.StartTime) }} ~
                          {{ getRegTime(act.EndTime) }}
                        </p>
                      </div>
                      <div class="d-flex mb-3 me-3">
                        <span class="material-icons text-primary me-1">
                          place
                        </span>
                        <p class="fs-8">{{ act.Location }}</p>
                      </div>
                      <div class="d-flex me-3" v-if="act.Class1">
                        <span class="material-icons text-primary me-1">
                          local_offer
                        </span>
                        <ul class="d-flex">
                          <li
                            v-if="act.Class1"
                            class="badge bg-primary p-1 fs-8 mb-2 me-3 fw-light"
                          >
                            {{ act.Class1 }}
                          </li>
                          <li
                            v-if="act.Class2 && act.Class2 !== act.Class1"
                            class="badge bg-primary p-1 mb-2 me-3 fs-8 fw-light"
                          >
                            {{ act.Class2 }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="d-flex justify-content-between align-items-center mb-5"
              >
                <div class="d-flex">
                  <span class="material-icons text-third me-1"> place </span>
                  <h2>美食品嚐</h2>
                </div>
              </div>
              <ul class="row mb-8"  v-if="restaurantData">
                <li
                  class="col-md-6 col-lg-4 mb-5"
                  v-for="res in restaurantData"
                  :key="res.RestaurantID"
                >
                <div
                  class="card border-0 rounded-3 position-relative shadow h-100"
                  >
                    <img
                      v-if="res.Picture.PictureUrl1"
                      :src="res.Picture.PictureUrl1"
                      :alt="res.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <a
                      v-if="res.WebsiteUrl"
                      :href="res.WebsiteUrl"
                      target="_blank"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ res.RestaurantName }}</h3>
                      <div class="d-flex me-3 mb-3" v-if="res.OpenTime">
                        <span class="material-icons text-primary me-1">
                          watch_later
                        </span>
                        <p class="fs-8">
                          {{ res.OpenTime }}
                        </p>
                      </div>
                      <div class="d-flex mb-3 me-3">
                        <span class="material-icons text-primary me-1">
                          place
                        </span>
                        <p class="fs-8">{{ res.Address }}</p>
                      </div>
                      <div class="d-flex me-3" v-if="res.Class">
                        <span class="material-icons text-primary me-1">
                          local_offer
                        </span>
                        <ul class="d-flex">
                          <li class="badge bg-primary p-1 fs-8 fw-light">
                            {{ res.Class }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="d-flex justify-content-between align-items-center mb-5"
              >
                <div class="d-flex">
                  <span class="material-icons text-third me-1"> place </span>
                  <h2>住宿推薦</h2>
                </div>
              </div>
              <ul class="row mb-8"  v-if="hotelData">
                <li
                  class="col-md-6 col-lg-4 mb-5"
                  v-for="hol in hotelData"
                  :key="hol.HotelID"
                >
                  <div
                    class="card border-0 rounded-3 position-relative shadow h-100"
                  >
                    <img
                      v-if="hol.Picture.PictureUrl1"
                      :src="hol.Picture.PictureUrl1"
                      :alt="hol.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <a
                      v-if="hol.WebsiteUrl"
                      :href="hol.WebsiteUrl"
                      target="_blank"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ hol.HotelName }}</h3>
                      <div class="d-flex me-3 mb-3">
                        <span class="material-icons text-primary me-1">
                          call
                        </span>
                        <p class="fs-8">{{ hol.Phone }}</p>
                      </div>
                      <div class="d-flex mb-3 me-3">
                        <span class="material-icons text-primary me-1">
                          place
                        </span>
                        <p class="fs-8">{{ hol.Address }}</p>
                      </div>
                      <div class="d-flex me-3" v-if="hol.Class">
                        <span class="material-icons text-primary me-1">
                          local_offer
                        </span>
                        <ul class="d-flex">
                          <li class="badge bg-primary p-1 fs-8 fw-light">
                            {{ hol.Class }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- search 之後出現的內容資料 -->
            <div class="px-5" v-if="!renderInit">
              <div
                class="d-flex justify-content-between align-items-center mb-5"
              >
                <div class="d-flex">
                  <span class="material-icons text-third me-1"> place </span>
                  <h2 v-if="selectedName" class="fs-5">
                    {{ selectedName }}
                    <span
                      v-if="selectedCityName"
                      class="badge bg-third fs-7 ms-3 fw-normal"
                      v-text="selectedCityName"
                    ></span>
                  </h2>
                  <h2 v-else class="fs-5">旅遊景點</h2>
                </div>
              </div>
              <ul class="row mb-8" v-if="selectedType === 'ScenicSpot'">
                <li
                  class="col-md-6 col-lg-4 mb-5"
                  v-for="s in selectedData"
                  :key="s.ScenicSpotID"
                >
                  <div
                    class="card border-0 rounded-3 position-relative shadow h-100"
                  >
                    <img
                      v-if="s.Picture.PictureUrl1"
                      :src="s.Picture.PictureUrl1"
                      :alt="s.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <img
                      v-else
                      src="@/assets/images/img.png"
                      alt="img"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <a
                      v-if="s.WebsiteUrl"
                      :href="s.WebsiteUrl"
                      target="_blank"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ s.ScenicSpotName }}</h3>
                      <div class="d-flex mb-3 me-3">
                        <span class="material-icons text-primary me-1">
                          place
                        </span>
                        <p class="fs-8">{{ s.Address }}</p>
                      </div>
                      <div class="d-flex mb-3 me-3" v-if="s.OpenTime">
                        <span class="material-icons text-primary me-1">
                          watch_later
                        </span>
                        <p class="fs-8">
                          {{ s.OpenTime }}
                        </p>
                      </div>
                      <div class="d-flex me-3" v-if="s.Class1">
                        <span class="material-icons text-primary me-1">
                          local_offer
                        </span>
                        <ul class="d-flex flex-wrap">
                          <li
                            v-if="s.Class1"
                            class="badge bg-primary p-1 fs-8 mb-2 me-3 fw-light"
                          >
                            {{ s.Class1 }}
                          </li>
                          <li
                            v-if="s.Class2 && s.Class2 !== s.Class1"
                            class="badge bg-primary p-1 fs-8 mb-2 me-3 fw-light"
                          >
                            {{ s.Class2 }}
                          </li>
                          <li
                            v-if="s.Class3 && s.Class3 !== s.Class2"
                            class="badge bg-primary p-1 fs-8 mb-2 fw-light"
                          >
                            {{ s.Class3 }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="row mb-8" v-else-if="selectedType === 'Activity'">
                <li
                  class="col-md-6 col-lg-4 mb-5"
                  v-for="a in selectedData"
                  :key="a.ActivityID"
                >
                  <div
                    class="card border-0 rounded-3 position-relative shadow h-100"
                  >
                    <img
                      v-if="a.Picture.PictureUrl1"
                      :src="a.Picture.PictureUrl1"
                      :alt="a.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <img
                      v-else
                      src="@/assets/images/img.png"
                      alt="img"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <a
                      v-if="a.WebsiteUrl"
                      :href="a.WebsiteUrl"
                      target="_blank"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ a.ActivityName }}</h3>
                      <div class="d-flex me-3 mb-3">
                        <span class="material-icons text-primary me-1">
                          watch_later
                        </span>
                        <p class="fs-8">
                          {{ getRegTime(a.StartTime) }} ~
                          {{ getRegTime(a.EndTime) }}
                        </p>
                      </div>
                      <div class="d-flex mb-3 me-3">
                        <span class="material-icons text-primary me-1">
                          place
                        </span>
                        <p class="fs-8">{{ a.Location }}</p>
                      </div>
                      <div class="d-flex me-3" v-if="a.Class1">
                        <span class="material-icons text-primary me-1">
                          local_offer
                        </span>
                        <ul class="d-flex">
                          <li
                            v-if="a.Class1"
                            class="badge bg-primary p-1 fs-8 mb-2 me-3 fw-light"
                          >
                            {{ a.Class1 }}
                          </li>
                          <li
                            v-if="a.Class2 && a.Class2 !== a.Class1"
                            class="badge bg-primary p-1 mb-2 me-3 fs-8 fw-light"
                          >
                            {{ a.Class2 }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="row mb-8" v-else-if="selectedType === 'Restaurant'">
                <li
                  class="col-md-6 col-lg-4 mb-5"
                  v-for="r in selectedData"
                  :key="r.RestaurantID"
                >
                  <div
                    class="card border-0 rounded-3 position-relative shadow h-100"
                  >
                    <img
                      v-if="r.Picture.PictureUrl1"
                      :src="r.Picture.PictureUrl1"
                      :alt="r.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <img
                      v-else
                      src="@/assets/images/img.png"
                      alt="img"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <a
                      v-if="r.WebsiteUrl"
                      :href="r.WebsiteUrl"
                      target="_blank"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ r.RestaurantName }}</h3>
                      <div class="d-flex me-3 mb-3" v-if="r.OpenTime">
                        <span class="material-icons text-primary me-1">
                          watch_later
                        </span>
                        <p class="fs-8">
                          {{ r.OpenTime }}
                        </p>
                      </div>
                      <div class="d-flex mb-3 me-3">
                        <span class="material-icons text-primary me-1">
                          place
                        </span>
                        <p class="fs-8">{{ r.Address }}</p>
                      </div>
                      <div class="d-flex me-3" v-if="r.Class">
                        <span class="material-icons text-primary me-1">
                          local_offer
                        </span>
                        <ul class="d-flex">
                          <li class="badge bg-primary p-1 fs-8 fw-light">
                            {{ r.Class }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="row mb-8" v-else-if="selectedType === 'Hotel'">
                <li
                  class="col-md-6 col-lg-4 mb-5"
                  v-for="h in selectedData"
                  :key="h.HotelID"
                >
                  <div
                    class="card border-0 rounded-3 position-relative shadow h-100"
                  >
                    <img
                      v-if="h.Picture.PictureUrl1"
                      :src="h.Picture.PictureUrl1"
                      :alt="h.Picture.PictureDescription1"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <img
                      v-else
                      src="@/assets/images/img.png"
                      alt="img"
                      class="card-img-obj rounded-top-3 h-200"
                    />
                    <a
                      v-if="h.WebsiteUrl"
                      :href="h.WebsiteUrl"
                      target="_blank"
                      class="d-flex position-absolute top-0 end-0 mt-3 me-3 bg-primary2 link-white border border-0 rounded-3 material-icons p-3"
                    >
                      share
                    </a>
                    <div class="px-3 py-2 text-break">
                      <h3 class="fs-7 fw-bold mb-3">{{ h.HotelName }}</h3>
                      <div class="d-flex me-3 mb-3">
                        <span class="material-icons text-primary me-1">
                          call
                        </span>
                        <p class="fs-8">{{ h.Phone }}</p>
                      </div>
                      <div class="d-flex mb-3 me-3">
                        <span class="material-icons text-primary me-1">
                          place
                        </span>
                        <p class="fs-8">{{ h.Address }}</p>
                      </div>
                      <div class="d-flex me-3" v-if="h.Class">
                        <span class="material-icons text-primary me-1">
                          local_offer
                        </span>
                        <ul class="d-flex">
                          <li class="badge bg-primary p-1 fs-8 fw-light">
                            {{ h.Class }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="text-center">
                <a
                  href="#"
                  class="btn btn-outline-primary mb-5"
                  v-show="loadMore"
                  @click.prevent="loadMoreData"
                >
                  <span
                    >讀取更多({{ selectedData.length }}/{{
                      selectedTotalData.length
                    }})</span
                  >
                </a>
              </div>
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
      qnt: 9,
      start: 0,
      end: 0,
      selectedTotalData: [],
      selectedData: [],
      filterData: [],
      time: '',
      loadMore: false,
      spotData: [],
      activityData: [],
      restaurantData: [],
      hotelData: [],
      renderInit: false
    }
  },
  mounted () {
    this.getInitData()
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
    goSearch (selected, city, word) {
      this.selectedType = selected
      this.selectedCity = city || ''
      this.keyword = word
    },
    getRegTime (time) {
      this.time = time
      return this.time.split('T')[0]
    },
    getInitData () {
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism'
      const data = []
      this.typeData.forEach((item) => data.push(item.en))
      data.forEach((typeItem) => {
        this.axios({
          method: 'get',
          url: `${url}/${typeItem}?&$filter=contains(Picture/PictureUrl1,'https')&$top=6&$format=JSON`,
          headers: this.getAuthorizationHeader()
        })
          .then((res) => {
            switch (typeItem) {
              case 'ScenicSpot':
                this.spotData = res.data
                break
              case 'Activity':
                this.activityData = res.data
                break
              case 'Restaurant':
                this.restaurantData = res.data
                break
              case 'Hotel':
                this.hotelData = res.data
                break
            }
            console.log(this.spotData, this.activityData, this.restaurantData, this.hotelData)
          })
          .then((res1) => {
            if (this.spotData && this.activityData) {
              if (this.hotelData && this.restaurantData) {
                this.renderInit = true
              }
            }
          })
          .catch((err) => {
            console.log(err.response)
            console.log('fail')
          })
      })
    },
    getSearchResultData () {
      const currentCity = this.selectedCity
      const currentType = this.selectedType
      const keywords = this.keyword || ''
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism'
      this.axios({
        method: 'get',
        url: `${url}/${currentType}${currentCity ? '/' : ''}${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then((res) => {
          this.selectedTotalData = res.data
          this.selectedData = []
          this.loadMore = false
          const total = this.selectedTotalData.length
          const num = this.qnt
          if (keywords) {
            if (this.selectedType === 'ScenicSpot' || this.selectedType === 'Activity') {
              this.filterData = this.selectedTotalData.filter((item) => {
                return (
                  item.Class1 === this.keyword || item.Class2 === this.keyword
                )
              })
            } else {
              this.filterData = this.selectedTotalData.filter((item) => {
                return item.Class === this.keyword
              })
            }
            this.selectedTotalData = this.filterData
            for (let i = 0; i < num; i++) {
              this.selectedData.push(this.selectedTotalData[i])
            }
            if (total > num) {
              this.loadMore = true
            }
          } else {
            for (let i = 0; i < num; i++) {
              this.selectedData.push(this.selectedTotalData[i])
            }
            if (total > num) {
              this.loadMore = true
            }
          }
          console.log(
            this.selectedTotalData,
            this.selectedData,
            this.selectedTotalData.length
          )
        })
        .then((res2) => {
          if (this.selectedData) {
            this.renderInit = false
          }
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    loadMoreData () {
      const total = this.selectedTotalData.length
      const showNum = this.selectedData.length
      let start = this.start
      let end = this.end || this.qnt
      const num = this.qnt
      if (showNum < total) {
        if (total - showNum >= num) {
          start += num
          end += num
        } else {
          const temNum = total - showNum
          start += temNum
          end += temNum
          this.loadMore = false
        }
        for (let i = start; i < end; i++) {
          this.selectedData.push(this.selectedTotalData[i])
        }
        this.start = start
        this.end = end
        console.log(start, end)
      } else {
        this.loadMore = false
      }
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
