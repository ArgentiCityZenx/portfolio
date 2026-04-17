(() => {

const gallery = document.getElementById('gallery')
const targetRowHeight = window.innerWidth < 768 ? 160 : 260
const gap = 12

function layoutGallery(){

  const imgs=[...gallery.querySelectorAll('img')]

  if(!imgs.length) return

  gallery.innerHTML=''
  
  let row=[]
  let ratioSum=0
  const containerWidth=gallery.clientWidth

  imgs.forEach((img,i)=>{

    const w = img.naturalWidth || 1600
    const h = img.naturalHeight || 1000
    const ratio = w/h

    row.push({img,ratio})
    ratioSum += ratio

    const expectedWidth = ratioSum * targetRowHeight + (row.length-1)*gap

    const isLast = i===imgs.length-1

    if(expectedWidth >= containerWidth || isLast){

      const rowDiv=document.createElement('div')
      rowDiv.className='gallery-row'

      const rowHeight = (containerWidth - ((row.length-1)*gap)) / ratioSum

      row.forEach(item=>{
        item.img.style.width=(rowHeight*item.ratio)+'px'
        item.img.style.height=rowHeight+'px'
        rowDiv.appendChild(item.img)
      })

      gallery.appendChild(rowDiv)

      row=[]
      ratioSum=0
    }

  })

}

function waitImages(){
 const imgs=[...document.querySelectorAll('#gallery img')]
 let loaded=0

 imgs.forEach(img=>{
   if(img.complete){
      loaded++
      if(loaded===imgs.length) layoutGallery()
      return
   }

   img.onload=()=>{
      loaded++
      if(loaded===imgs.length) layoutGallery()
   }
 })
}

waitImages()

window.addEventListener('resize',()=>{
 clearTimeout(window.galleryResize)
 window.galleryResize=setTimeout(layoutGallery,150)
})

})()
