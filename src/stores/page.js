import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers';

export const usePageStore = defineStore('page', () => { 
  const inquiryStep = ref(0)   
  const gallerys = ref([])
  const portfolioTab = ref('video');
  const html2Pdf = ref(null)

  const albumDetail = ref([]) 
  const headerVideosList = ref([])

  // const testSlider = computed(() => {
  //   let TestingVideos = []
  //   headerVideosList.value.filter((item) => { 
  //     TestingVideos.push(item.upload_video)      
  //   });  
  //   return TestingVideos
  // })  

  const sliderVideos = async () => {  
    const res = await fetchWrapper.get('header-videos');
    headerVideosList.value = res.data	
  }  

  const videoGallery = computed(() => {
    let videos = []
    gallerys.value.filter((item) => { 
      if(item.portfolios_type == 'videos')  {
        videos.push(item.upload_video)
      } 
    });  
    return videos
  })

  const imageGallery = computed(() => {
    let images = []
    gallerys.value.filter((item) => { 
      if(item.portfolios_type == 'images')  {
        images.push(item)
      } 
    });  
    return images
  })
  
  const getPortfolio = async () => {  
    const res = await fetchWrapper.get('portfolios');
    gallerys.value = res.data	
  }  

  function changePortfolioTab(tab){
    portfolioTab.value = tab
  }

  const getAlbumDetails = async (slug) => {  
    const response = await fetchWrapper.get(`portfolios/album/${slug}`);    
    albumDetail.value = response.data    
  } 
  
  return {sliderVideos, headerVideosList ,html2Pdf, inquiryStep, getPortfolio, videoGallery, imageGallery, portfolioTab, changePortfolioTab, getAlbumDetails, albumDetail}
})
