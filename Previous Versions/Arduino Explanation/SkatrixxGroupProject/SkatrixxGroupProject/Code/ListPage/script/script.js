$(document).ready(function () {

    let tricksCardsArray = JSON.parse(localStorage.getItem('tricks'))

    for (let i = 0; i < tricksCardsArray.length; i++) {
        console.log("for")
        $('#trickList').append(`
               <a href="../TrickPage/index2.html?key=${i}">
                   <div class="cards" >
                    <div class="cardcontent">
                        <div class="cardcontentitem">
                            <div class="cardcontentitem-column">
                                <div class="cardcontent-trickname">${tricksCardsArray[i].name}</div> 
                                <div class="cardcontent-time">${tricksCardsArray[i].time}</div> 
                            </div>
                        </div>
                        <div class="cardcontentitem">
                            ${tricksCardsArray[i].date}
                        </div>
                        <div class="cardcontentitem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26.937" height="23.696" viewBox="0 0 26.937 23.696">
                                <path id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M23.417,3.8a6.927,6.927,0,0,0-9.452.689l-1,1.028-1-1.028A6.926,6.926,0,0,0,2.517,3.8a7.273,7.273,0,0,0-.5,10.531l9.8,10.12a1.588,1.588,0,0,0,2.295,0l9.8-10.12a7.269,7.269,0,0,0-.5-10.531Z" transform="translate(0.502 -1.745)" fill="none" stroke="#000" stroke-width="1"/>
                              </svg>                              
                        </div>
                    </div>
                </div>
               </a>`)
    }
});


