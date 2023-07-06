<script setup>
import { ref, onMounted } from 'vue'
import jsPDF from 'jspdf'
import Vue3Html2pdf from 'vue3-html2pdf'
import  {useEventStore} from '@/stores/event.store'
import  {usePageStore} from '@/stores/page'
import { storeToRefs } from "pinia";
const pageStore = usePageStore()
const store = useEventStore()  
const { orders, pdfValue } = storeToRefs (store)
const { html2Pdf} = storeToRefs (pageStore)

async function beforeDownload ({ html2pdf, options, pdfContent }) {
    // console.log(pdfContent);
    // await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
    //     const totalPages = pdf.internal.getNumberOfPages()
    //     for (let i = 1; i <= totalPages; i++) {
    //         pdf.setPage(i)
    //         pdf.setFontSize(10)
    //         pdf.setTextColor(150)
    //         pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
    //     } 
    // })
    //.save()
}

function onProgress(event) {
    console.log(`Processed: ${event} / 100`);
}
</script>
<template>
    <div>
        <vue3-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="ticket"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        :pdf-margin="10"
        pdf-orientation="portrait"
        pdf-content-width="100%"
        @progress="onProgress($event)"     
        @beforeDownload="beforeDownload($event)"        
        ref="html2Pdf"
    >
        <template v-slot:pdf-content>
            <section class="pdf-item" v-if="pdfValue === true">
                <div class="ticket">
                    <div class="ticket--start">
                        <img src="https://i.ibb.co/W3cK42J/image-1.png"/>
                    </div>
                    <div class="ticket--center">
                        <div class="ticket--center--row">
                        <div class="ticket--center--col">
                            <span>Your ticket for</span>
                            <strong>{{ orders.events.title }}</strong>
                        </div>
                        </div>
                        <div class="ticket--center--row">
                        <div class="ticket--center--col">
                            <span class="ticket--info--title">Date and time</span>
                            <span class="ticket--info--subtitle">{{ orders.events.eventDate }}</span>
                            <span class="ticket--info--content">{{ orders.events.eventTime }}</span>
                        </div>
                        <div class="ticket--center--col">
                            <span class="ticket--info--title">Location</span>
                            <span class="ticket--info--content">{{orders.events.eventLocation}}</span>
                        </div>
                        </div>
                        <div class="ticket--center--row">
                        <div class="ticket--center--col">
                            <span class="ticket--info--title">Ticket No.</span>
                            <span class="ticket--info--content">{{orders.ticket_id}}</span>
                        </div>
                        <div class="ticket--center--col">
                            <span class="ticket--info--title">Order info</span>
                            <span  class="ticket--info--content">Order #{{orders.orders.order_id}}</span>
                        </div>
                        </div>
                    </div>
                    <div class="ticket--end">
                        <div><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Qrcode_wikipedia_fr_v2clean.png"></div>
                        <!-- <div><img src="https://qidoon.com/assets/img/logo.svg"/></div>                     -->
                    </div>
                </div>
            </section>
        </template>
    </vue3-html2pdf>    
    </div>
 </template>
<style lang="scss">
$primary: #4872b0;
$grey: #E0E0E0;

.ticket{
  display: flex;
  font-family:Roboto;
  margin: 16px;
  border: 1px solid $grey;
  position:relative;
  
  &:before{
    content:'';
    width:32px;
    height:32px;
    background-color:#fff;
    border: 1px solid $grey;
    border-top-color:transparent;
    border-left-color:transparent;
    position:absolute;
    transform:rotate(-45deg);
    left:-18px;
    top:50%;
    margin-top:-16px;
    border-radius:50%;
  }
  
  &:after{
    content:'';
    width:32px;
    height:32px;
    background-color:#fff;
    border: 1px solid $grey;
    border-top-color:transparent;
    border-left-color:transparent;
    position:absolute;
    transform:rotate(135deg);
    right:-18px;
    top:50%;
    margin-top:-16px;
    border-radius:50%;
  }
  
  &--start{
    position:relative;
    &:before{
      content:'';
      width:32px;
      height:32px;
      background-color:#fff;
      border: 1px solid $grey;
      border-top-color:transparent;
      border-left-color:transparent;
      border-right-color:transparent;
      position:absolute;
      transform:rotate(-45deg);
      left:-18px;
      top:-2px;
      margin-top:-16px;
      border-radius:50%;
    }
    
    &:after{
      content:'';
      width:32px;
      height:32px;
      background-color:#fff;
      border: 1px solid $grey;
      border-top-color:transparent;
      border-left-color:transparent;
      border-bottom-color:transparent;
      position:absolute;
      transform:rotate(-45deg);
      left:-18px;
      top:100%;
      margin-top:-16px;
      border-radius:50%;
    }
    & > img{
      display:block;
      padding: 24px;
      height: 270px;
    }
    border-right: 1px dashed $grey;
  }
  
  &--center{
    padding: 24px;
    flex: 1;
    &--row{
      display: flex;
      &:not(:last-child){
        padding-bottom:48px;
      }
      
      &:first-child{
        span{
          color:$primary;
          text-transform:uppercase;
          line-height:24px;
          font-size:13px;
          font-weight:500;
        }
        
        strong{
          font-size:20px;
          font-weight:400;
          text-transform:uppercase;
        }
      }
    }
    
    &--col{
      display: flex;
      flex:1;
      width: 50%;
      box-sizing:border-box;
      flex-direction: column;
      &:not(:last-child){
        padding-right: 16px;
      }
    }
  }
  
  &--end{
    padding: 24px;
    background-color:$primary;
    display:flex;
    flex-direction:column;
    position:relative;
    &:before{
      content:'';
      width:32px;
      height:32px;
      background-color:#fff;
      border: 1px solid $grey;
      border-top-color:transparent;
      border-right-color:transparent;
      border-bottom-color:transparent;
      position:absolute;
      transform:rotate(-45deg);
      right:-18px;
      top:-2px;
      margin-top:-16px;
      border-radius:50%;
    }
    
    &:after{
      content:'';
      width:32px;
      height:32px;
      background-color:#fff;
      border: 1px solid $grey;
      border-right-color:transparent;
      border-left-color:transparent;
      border-bottom-color:transparent;
      position:absolute;
      transform:rotate(-45deg);
      right:-18px;
      top:100%;
      margin-top:-16px;
      border-radius:50%;
    }
  
    & > div{
      &:first-child{
      flex:1;
        & >img{
          width: 128px;
          padding: 4px;
          background-color: #fff;
        }
      }
      
      &:last-child{
        > img{
          display:block;
          margin: 0 auto;
          filter: brightness(0) invert(1);
          opacity:0.64;
        }
      }
    }
  }
  
  &--info{
    &--title{
      text-transform:uppercase;
      color: #757575;
      font-size:13px;
      line-height:24px;
      font-weight:600;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    
    &--subtitle{
      font-size: 16px;
      line-height:24px;
      font-weight:500;
      color:$primary;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    
    &--content{
      font-size:13px;
      line-height:24px; 
      font-weight: 500;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
}
</style>