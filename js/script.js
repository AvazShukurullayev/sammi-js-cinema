"use strict"
document.addEventListener("DOMContentLoaded", () => {
    // Initializing dom elements
    const tabsParent = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        loader = document.querySelector(".loader");

    // variables
    const initialContentIndex = 0

    // Loading
    setTimeout(() => {
        loader.style.opacity = "0"
        setTimeout(() => {
            loader.style.display = "none"
        }, 500)
    }, 2000)

    // Tabs
    function hideTabContent() {
        tabsContent.forEach(item => item.style.display = "none")
        tabs.forEach(item => item.classList.remove("tabheader__item_active"))
    }

    function showTabContent(ind = 0) {
        tabsContent[ind].style.display = "block"
        tabs[ind].classList.add("tabheader__item_active")
    }

    hideTabContent()
    showTabContent(initialContentIndex)

    tabsParent.addEventListener("click", (event) => {
        let target = event.target
        tabs.forEach((item, index) => {
            if (target && target === item) {
                hideTabContent()
                showTabContent(index)
            }
        })
    })

// Timer
    const deadline = "2024-08-11"
    const newDate = new Date()

    function getTimeRemaining(deadline) {
        const timer = Date.parse(deadline) - Date.parse(newDate)
        let days, hours, minutes, seconds
        if (timer <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(timer / (1000 * 60 * 60 * 24))
            hours = Math.floor((timer / (1000 * 60 * 60)) % 24)
            minutes = Math.floor((timer / (1000 * 60)) % 60)
            seconds = Math.floor((timer / 1000) % 60)
        }

        return {timer, days, hours, minutes, seconds}
    }

    function getZeroTime(num) {
        if (0 <= num && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, deadline) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock() {
            const t = getTimeRemaining(deadline)

            days.innerHTML = getZeroTime(t.days)
            hours.innerHTML = getZeroTime(t.hours)
            minutes.innerHTML = getZeroTime(t.minutes)
            seconds.innerHTML = getZeroTime(t.seconds)

            if (t.timer <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock(".timer", deadline)

    // Modal
    const modalTrigger = document.querySelector("[data-modal]"),
        modal = document.querySelector(".modal");
    // hozi kerak emas
    // modalCloseBtn = document.querySelector("[data-close]");

    function closeModal() {
        modal.classList.add("hide")
        modal.classList.remove("show")
        document.body.style.overflow = ""
    }

    function openModal() {
        modal.classList.add("show", "fade")
        modal.classList.remove("hide")
        document.body.style.overflow = "hidden"
        clearTimeout(modalTimerId)
    }

    modalTrigger.addEventListener("click", openModal)

    // bu ham keremas
    // modalCloseBtn.addEventListener("click", closeModal)

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute('close-modal') === "") {
            closeModal()
        }
    })

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 5000)

    // console.log(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal()
            window.removeEventListener("scroll", showModalByScroll)
        }
    }

    window.addEventListener("scroll", showModalByScroll)

    // Class
    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.desc = desc
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.convert = 11000
            this.convertToUzs()
        }

        convertToUzs() {
            this.price = this.price * this.convert
        }

        render() {
            const element = document.createElement("div")
            if (this.classes.length === 0) {
                element.classList.add("menu__item")
            } else {
                this.classes.forEach(itemClass => element.classList.add(itemClass))
            }

            element.innerHTML = `
               <img src=${this.src} alt=${this.alt}/>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.desc}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                   <div class="menu__item-cost">Price:</div>
                   <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
               </div>
            `

            this.parent.append(element)
        }
    }

    axios.get("http://localhost:3000/menu").then(({data}) => {
        console.log(data)
        data.forEach(({
                          src,
                          alt,
                          title,
                          desc,
                          price
                      }) => new MenuCard(src, alt, title, desc, price, ".menu .container").render())
    })

    // async function getResource(url) {
    //     const response = await fetch(url)
    //
    //     return await response.json()
    // }
    //
    // getResource("http://localhost:3000/menu")
    //     .then((data) => data.forEach(({
    //                                       src,
    //                                       alt,
    //                                       title,
    //                                       desc,
    //                                       price
    //                                   }) => new MenuCard(src, alt, title, desc, price, ".menu .container").render()))
    //     .catch(e => console.log(e))

    // class keremas uni orniga function yozamiz
    // new MenuCard(
    //     "img/tabs/1.png",
    //     'vegy',
    //     'Plan "useal"',
    //     'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
    //     10,
    //     ".menu .container"
    // ).render()
    //
    // new MenuCard(
    //     "img/tabs/2.jpg",
    //     'elite',
    //     'Plan "Premium"',
    //     'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
    //     20,
    //     ".menu .container"
    // ).render()
    //
    // new MenuCard(
    //     "img/tabs/3.jpg",
    //     'vip',
    //     'Plan VIP',
    //     'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
    //     30,
    //     ".menu .container"
    // ).render()


// Form
    const forms = document.querySelectorAll("form")

    forms.forEach(form => {
        bindPostData(form)
    })

    const msg = {
        loading: "Loading...",
        success: "Thanks for submitting our form",
        failure: "Something went wrong"
    }

    async function postData(url, data) {
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: data
        })
        console.log("res => ", await res)
        return await res.json()
    }

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault()

            const statusMessage = document.createElement("div")
            statusMessage.textContent = msg.loading
            form.append(statusMessage)

            // const request = new XMLHttpRequest()
            // request.open("POST", "server.php")
            // setRequestHeader kerak emas chunki formData qoyib beradi
            // request.setRequestHeader("Content-Type", "multipart/form-data")
            // const formData = new FormData(form)
            // console.log("formData => ", formData)
            // request.send(formData)

            // const obj = {}
            // request.setRequestHeader("Content-Type", "application/json")

            const formData = new FormData(form)
            // formData = object qaytaradi
            // formData.forEach((val, key) => {
            //     obj[key] = val
            // })

            const json = JSON.stringify(Object.fromEntries(formData.entries()))
            // const json = JSON.stringify(obj)
            // console.log("formData => ", formData)
            // request.send(json)

            // request.addEventListener("load", () => {
            //     if (request.status === 200) {
            //         console.log(request.response)
            //         // statusMessage.textContent = msg.success
            //         showThanksModal(msg.success)
            //         form.reset()
            //         setTimeout(() => {
            //             statusMessage.remove()
            //         }, 2000)
            //     } else {
            //         // statusMessage.textContent = msg.failure
            //         showThanksModal(msg.failure)
            //     }
            // })

            //     fetch practice
            // fetch("http://localhost:3000/request", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(obj),
            // })
            //     .then(data => data.text())

            postData("http://localhost:3000/request", json)
                .then(r => {
                    console.log(r)
                    showThanksModal(msg.success)
                    statusMessage.remove()
                })
                .catch(e => {
                    console.log(e)
                    showThanksModal(msg.failure)
                })
                .finally(() => {
                    console.log("Finally")
                    form.reset()
                })
        })
    }

    // modal oynani dynamic chiqaramiz
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog")

        // prevModalDialog.classList.remove("show")
        prevModalDialog.classList.add("hide")
        openModal()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add("modal__dialog")
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `

        document.querySelector(".modal").append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add("show")
            prevModalDialog.classList.remove("hide")
            closeModal()
        }, 4000)
    }

//     fetch server json
//     fetch("http://localhost:3000/menu").then(data => data.json()).then(res => console.log(res))

//     slider
    const slides = document.querySelectorAll(".offer__slide"),
        next = document.querySelector(".offer__slider-next"),
        prev = document.querySelector(".offer__slider-prev"),
        currentSlide = document.querySelector("#current"),
        totalSlide = document.querySelector("#total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width

    // ---******************************************************************---
    // CAROUSEL SLIDER
    let slideIndex = 1
    let offset = 0

    slidesField.style.width = `${100 * slides.length}%`
    slidesField.style.display = "flex"
    slidesField.style.transition = "0.7s ease-in all"
    slidesWrapper.style.overflow = "hidden"
    slides.forEach(slide => {
        slide.style.width = width
    })

    function slideCounter(slideIndex) {
        if (0 < slides.length && slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`
            totalSlide.textContent = `0${slides.length}`
        } else {
            currentSlide.textContent = `${slideIndex}`
            totalSlide.textContent = `${slides.length}`
        }
    }

    slideCounter(slideIndex)
    next.addEventListener("click", () => {
        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0
        } else {
            offset += +width.slice(0, width.length - 2)
        }
        slidesField.style.transform = `translateX(-${offset}px)`
        if (slideIndex >= slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }
        slideCounter(slideIndex)
    })

    prev.addEventListener("click", () => {
        if (offset === 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2)
        }
        slidesField.style.transform = `translateX(-${offset}px)`
        if (slideIndex <= 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }
        slideCounter(slideIndex)
    })
    // ---******************************************************************---

    // ---******************************************************************---
    //                          EASY SLIDER
    // ---******************************************************************---

    /*let slideIndex = 1
    showSlides(slideIndex)
    if (slides.length < 10) {
        totalSlide.textContent = `0${slides.length}`
    } else {
        totalSlide.textContent = slides.length
    }

    function showSlides(index) {
        if (index > slides.length) {
            slideIndex = 1
        }
        if (index < 1) {
            slideIndex = slides.length
        }

        slides.forEach(slide => slide.style.display = "none")
        slides[slideIndex - 1].style.display = "block"
        // currentSlide.textContent = (1 <= slideIndex && slideIndex <= 9) ? `0${slideIndex}` : slideIndex;

        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`
        } else {
            currentSlide.textContent = slideIndex
        }
    }

    function plusSlide(idx) {
        showSlides(slideIndex += idx)
    }

    next.addEventListener("click", () => {
        plusSlide(1)
    })

    prev.addEventListener("click", () => {
        plusSlide(-1)
    })*/

})