document.getElementById('close').addEventListener('click', function() {
    window.close()
}, false)

document.getElementById('minimize').addEventListener('click', function() {
    tools.minimize()
}, false)

document.getElementById('text').addEventListener('keyup', function() {
    // Something to stop it going over 14 lines ??
}, false)

// Thanks to https://www.techtalk7.com/limiting-number-of-lines-in-textarea/#comment-110101
const limitTextArea = (textArea, maxLines) => {
    // TODO : Doesn't currently work when text wraps
    let lines = textArea.innerText.replace(/\r/g, '').split('\n'), lines_removed, char_removed, i;
    if (lines.length > maxLines) {
        lines = lines.splice(0, maxLines);
        lines_removed = 1
    }
    console.log(lines)
}

class Book {
    constructor(pageIndicator, textBox, leftArrow, rightArrow) {
        this.maxPages = 20
        this.currentPage = 1
        this.usedPages = 1
        this.pageContents = Array(this.maxPages).fill("")
        this.pageIndicator = pageIndicator
        this.textBox = textBox
        this.leftArrow = leftArrow
        this.rightArrow = rightArrow
    }

    update() {
        if (this.currentPage < 1)
            this.currentPage = 1

        if (this.currentPage > this.maxPages)
            this.currentPage = this.maxPages

        if (this.usedPages < this.currentPage)
            this.usedPages = this.currentPage

        // hide arrows if needed
        if (this.currentPage <= 1)
            leftArrow.style.visibility = "hidden"
        else
            leftArrow.style.visibility = "visible"

        if (this.currentPage >= this.maxPages)
            rightArrow.style.visibility = "hidden"
        else
            rightArrow.style.visibility = "visible"
            
        this.pageIndicator.innerText = `Page ${this.currentPage} of ${this.usedPages}`

        this.textBox.innerText = this.pageContents[this.currentPage-1]
    }

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
}

const pageHeader = document.getElementById('header')
const textBox = document.getElementById('text')
const leftArrow = document.getElementById('left')
const rightArrow = document.getElementById('right')
const book = new Book(pageHeader, textBox, leftArrow, rightArrow)
book.update()

document.getElementById('left').addEventListener('click', function() {
    book.previousPage()
}, false)

document.getElementById('right').addEventListener('click', function() {
    book.nextPage()
}, false)