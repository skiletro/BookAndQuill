window.onkeydown = function(evt) {
    // Thanks to https://github.com/electron/electron/issues/8793#issuecomment-648307765 - Disables zooming with CTRL+ and CTRL-
    if ((evt.code == "Minus" || evt.code == "Equal") && (evt.ctrlKey || evt.metaKey)) {evt.preventDefault()}
}

// Save button
document.getElementById('save').addEventListener('click', function() {
    book.save()
}, false)

// Close button
document.getElementById('close').addEventListener('click', function() {
    window.close()
}, false)

// Minimize button
document.getElementById('minimize').addEventListener('click', function() {
    tools.minimize()
}, false)

class Book {
    constructor() {
        this.maxPages = 20
        this.currentPage = 1
        this.usedPages = 1
        this.pageContents = Array(this.maxPages).fill("")
        this.pageIndicator = document.getElementById('header')
        this.textBox = document.getElementById('text')
        this.leftArrow = document.getElementById('left')
        this.rightArrow = document.getElementById('right')
    }

    update() {
        // Checking to ensure that page counts have not gone out of bounds.
        if (this.currentPage < 1)
            this.currentPage = 1

        else if (this.currentPage > this.maxPages)
            this.currentPage = this.maxPages

        else if (this.usedPages < this.currentPage)
            this.usedPages = this.currentPage

        // Hides arrows if they are expected to allow the user to go out of the range of the page counts.
        this.leftArrow.style.visibility = (this.currentPage <= 1) ? "hidden" : "visible"
        this.rightArrow.style.visibility = (this.currentPage >= this.maxPages) ? "hidden" : "visible"
            
        // Sets the page indicator text to the right numbers
        this.pageIndicator.innerText = `Page ${this.currentPage} of ${this.usedPages}`

        // Sets the textbox to the content of the page.
        this.textBox.innerText = this.pageContents[this.currentPage-1]
    }

    // Inserts the content of the textbox into the array
    savePageContents() {
        this.pageContents[this.currentPage-1] = document.getElementById('text').innerText
    }

    nextPage() {
        this.savePageContents()
        this.currentPage++
        this.update()
    }

    previousPage() {
        this.savePageContents()
        this.currentPage--
        this.update()
    }

    save() {
        this.savePageContents()
        console.log(this.pageContents)
    }
}

const book = new Book()
book.update()

document.getElementById('left').addEventListener('click', function() {
    book.previousPage()
}, false)

document.getElementById('right').addEventListener('click', function() {
    book.nextPage()
}, false)