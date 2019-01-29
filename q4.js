"use strict" /* @charset "utf-8" */

var startQuiz = function(title, quiz, callback) {
	var nq = 0
	var pnt = 0
	var uienable = true

	var show = function(aquiz) {
		head.textContent = title + " - 第" + (nq + 1) + "問"
		ind.textContent = ""
		var anss = []
		for (var i = 0; i < aquiz.length - 2; i++)
			anss[i] = aquiz[i + 2]
		shuffle(anss)
		var anss2 = []
		for (var i = 0; i < 3; i++)
			anss2[i] = anss[i]
		anss2[3] = aquiz[1]
		shuffle(anss2)
		var first = true
		for (var i = 0; i < 4; i++) {
			var div = get("ans" + (i + 1))
			div.className = ""
			div.textContent = anss2[i]
			div.no = i
			div.onclick = function() {
				if (!uienable)
					return
				if (this.textContent == aquiz[1]) {
					ind.textContent = "正解"
					ind.className = "indcorrect"
					this.className = "correct"
					if (first)
						pnt++
					uienable = false
					setTimeout(function() {
						nq++
						if (nq < quiz.length) {
							show(quiz[nq])
						} else {
							ind.textContent = "クリア"
							ind.className = "indclear"
							if (callback)
								setTimeout(function() {
									callback(pnt)
								}, 3000)
						}
					}, 1000)
				} else {
					ind.textContent = "不正解"
					ind.className = "indincorrect"
					this.className = "disable"

					uienable = false
					setTimeout(function() {
						uienable = true
						ind.textContent = ""
					}, 1000)
				}
				first = false
			}
		}
		q.textContent = aquiz[0]
		uienable = true
	}

	show(quiz[nq])
}
