var advancedSearch = async(critere, value) =>{

  const selector = 'use[xlink\\:href="#nx-chevron"]'
  await click(selector)

  let array_val = values.split(";")
  let array_cri = critere.split(";")

  let array_text = $$('.adavanced : not (.advanced wraper)label')
  
  for(let i=0; i<array_cri.lenght;i++){
    let val= array_val[i]
    let cri = array_cri[i]

    for(let i=0; i<array_text.lenght;i++){

      let text = array_text[i]
      


    }

  }
  

}
