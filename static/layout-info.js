//Nooo, don't look at me, I'm hideous!

var nameHeader = document.getElementById("name-header")
var descriptionHeader = document.getElementById("description-header")
var imageSection = document.getElementById("image-section")
var infoSection = document.getElementById("info-section")
var infoSectionTable = document.getElementById("info-section").children[0].children[1]
var infoBSectionTable = document.getElementById("info-b-section").children[0].children[1]
var statSection = document.getElementById("stat-section")
var statSectionTable = document.getElementById("stat-section").children[0].children[1]
var movesHeader = document.getElementById("moves-header")
var movesSection = document.getElementById("moves-section")
var movesLevelTable = document.getElementById("moves-level")
var movesEvolutionTable = document.getElementById("moves-evolution")
var movesEggTable = document.getElementById("moves-egg")
var movesTmTable = document.getElementById("moves-tm")
var movesTutorTable = document.getElementById("moves-tutor")
var closeElement = document.getElementById("close-header")
var pokeInfoRow = document.getElementById("pokemon-info-row")

var typeColors = {
	Bug: "#A8B820",
	Dark: "#705848",
	Dragon: "#7038F8",
	Electric: "#F8D030",
	Fairy: "#EE99AC",
	Fighting: "#C03028",
	Fire: "#F08030",
	Flying: "#A890F0",
	Ghost: "#705898",
	Grass: "#78C850",
	Ground: "#E0C068",
	Ice: "#98D8D8",
	Normal: "#A8A878",
	Poison: "#A040A0",
	Psychic: "#F85888",
	Rock: "#B8A038",
	Steel: "#B8B8D0",
	Water: "#6890F0"
}
var typeNames = [
	"Bug",
	"Dark",
	"Dragon",
	"Electric",
	"Fairy",
	"Fighting",
	"Fire",
	"Flying",
	"Ghost",
	"Grass",
	"Ground",
	"Ice",
	"Normal",
	"Poison",
	"Psychic",
	"Rock",
	"Steel",
	"Water"
]
var eggGroupNames = [
	"Monster",
	"Water 1",
	"Water 2",
	"Water 3",
	"Human-Like",
	"Bug",
	"Mineral",
	"Flying",
	"Amorphous",
	"Field",
	"Fairy",
	"Ditto",
	"Grass",
	"Dragon",
	"Undiscovered"
]
var natures = {
	"Adamant":{"positive":"Attack","negative":"Sp. Atk"},
	"Bashful":{"positive":"Sp. Atk","negative":"Sp. Atk"},
	"Bold":{"positive":"Defense","negative":"Attack"},
	"Brave":{"positive":"Attack","negative":"Speed"},
	"Calm":{"positive":"Sp. Def","negative":"Attack"},
	"Careful":{"positive":"Sp. Def","negative":"Sp. Atk"},
	"Docile":{"positive":"Defense","negative":"Defense"},
	"Gentle":{"positive":"Sp. Def","negative":"Defense"},
	"Hardy":{"positive":"Attack","negative":"Attack"},
	"Hasty":{"positive":"Speed","negative":"Defense"},
	"Impish":{"positive":"Defense","negative":"Sp. Atk"},
	"Jolly":{"positive":"Speed","negative":"Sp. Atk"},
	"Lax":{"positive":"Defense","negative":"Sp. Def"},
	"Lonely":{"positive":"Attack","negative":"Defense"},
	"Mild":{"positive":"Sp. Atk","negative":"Defense"},
	"Modest":{"positive":"Sp. Atk","negative":"Attack"},
	"Naive":{"positive":"Speed","negative":"Sp. Def"},
	"Naughty":{"positive":"Attack","negative":"Sp. Def"},
	"Quiet":{"positive":"Sp. Atk","negative":"Speed"},
	"Quirky":{"positive":"Sp. Def","negative":"Sp. Def"},
	"Rash":{"positive":"Sp. Atk","negative":"Sp. Def"},
	"Relaxed":{"positive":"Defense","negative":"Speed"},
	"Sassy":{"positive":"Sp. Def","negative":"Speed"},
	"Serious":{"positive":"Speed","negative":"Speed"},
	"Timid":{"positive":"Speed","negative":"Attack"}
}

var currentPokemon
var showMoves = false

function selectPokemon(pokemon, element){
	if(!pokemon){
		infoSlideAway(function(){ infoMove() })
		return
	}
	if(currentPokemon){
		currentPokemon = null
		infoSlideAway(function(){ selectPokemon(pokemon, element) })
		return
	}
	currentPokemon = pokemon
	infoMove(element)
	showPokemonInfo(currentPokemon)
	infoSlideIn()
}
closeElement.onclick = ()=>{selectPokemon()}

function infoSlideAway(onDone){
	pokemonInfo.style.maxHeight = ""
	setTimeout(function(){
		pokemonInfo.className = "hidden-info"
	},50)
	if(showMoves)
		toggleShowMoves()
	setTimeout(function(){
		pokeInfoRow.style.display = "none"
		infoMove()
		if(onDone)
			onDone()
	},500)
}

function infoSlideIn(){
	pokeInfoRow.style.display = ""
	setTimeout(function(){
		pokemonInfo.className = "shown-info"
	},50)
	setTimeout(function(){
		pokemonInfo.style.maxHeight = "none"
	},500)
}

function infoMove(element){
	if(pokeInfoRow.parentNode)
		pokeInfoRow.parentNode.removeChild(pokeInfoRow)
	if(element && element.parentNode){
		element.parentNode.insertBefore(pokeInfoRow, element)
		pokeInfoRow.children[0].colSpan = element.children.length
		pokemonInfo.style.width = "100%"
		return
	}
	pokemonInfo.style.width = ""
	document.getElementById("pokemon-info-base").appendChild(pokeInfoRow)
}

function showPokemonInfo(pokemon){
	clearPokemonInfo()
	showNameHeader(pokemon)
	showDescriptionHeader(pokemon)
	showImageSection(pokemon)
	showInfoSection(pokemon)
	showInfoBSection(pokemon)
	showStatSection(pokemon)
	showMovesSection(pokemon)
}

function showNameHeader(pokemon){
	if(pokemon.base)
		nameHeader.innerHTML =  pokemon.name + getAmountShinyText(pokemon)
	else
		nameHeader.innerHTML = "#" + pokemon.id + " - " + pokemon.name
	if(pokemon.form && pokemon.form != "Base")
		nameHeader.innerHTML += " (" + pokemon.form + ")"
	var colorA = typeColors[pokemon.types[0]]
	var colorB = pokemon.types[1] ? typeColors[pokemon.types[1]] : typeColors[pokemon.types[0]]
	nameHeader.style.background = "linear-gradient(to right, " + colorA + ", " + colorB + ")"
}

function showDescriptionHeader(pokemon){
	descriptionHeader.innerHTML = pokemon.description
	if(pokemon.locations)
		descriptionHeader.title = pokemon.locations
	if(pokemon.notes)
		descriptionHeader.innerHTML = pokemon.notes
}

function showImageSection(pokemon){
	imageSection.innerHTML = "<img src='"+getPokemonImageName(pokemon)+"' style='height: 13rem;'/>"
}

function showInfoSection(pokemon){
	addInfoElement(infoSectionTable, pokemon, "Types |", getTypesText(pokemon))
	if(pokemon.nickname)
		addInfoElement(infoSectionTable, pokemon, "Nickname |", pokemon.nickname)
	else
		addInfoElement(infoSectionTable, pokemon, "Classification |", pokemon.classification)
	if(pokemon.ability)
		addInfoElement(infoSectionTable, pokemon, "Ability |", getAbilityText(pokemon.ability, pokemon.abilities[2] ? pokemon.abilities[2].toLowerCase() == pokemon.ability.toLowerCase() : false))
	else
		addInfoElement(infoSectionTable, pokemon, "Abilities |", getAbilitiesText(pokemon))
	if(pokemon.nature)
		addInfoElement(infoSectionTable, pokemon, "Nature |", pokemon.nature)
	else
		addInfoElement(infoSectionTable, pokemon, "Egg groups |", getEggGroupsText(pokemon))
	if(pokemon.gender)
		addInfoElement(infoSectionTable, pokemon, "Gender |", getGenderText(pokemon))
	else
		addInfoElement(infoSectionTable, pokemon, "Gender ratio |", getGenderText(pokemon))
	if(pokemon.hiddenPower)
		addInfoElement(infoSectionTable, pokemon, "Hidden power |", getTypeText(pokemon.hiddenPower))
	else
		addInfoElement(infoSectionTable, pokemon, "Weight/height |", getWeightHeightText(pokemon))
}

function showInfoBSection(pokemon){
	if(!pokemon.base) return
	if(pokemon.ot || pokemon.tid)
		addInfoElement(infoBSectionTable, pokemon, "OT |", pokemon.ot + " (" + prependZeroes(pokemon.tid, 6) + ")" )
	for(var i in pokemon.learntMoves)
		addInfoElement(infoBSectionTable, pokemon, "Move |", pokemon.learntMoves[i])
	if(pokemon.balls.length)
		addInfoElement(infoBSectionTable, pokemon, "Ball |", getBallsText(pokemon)).style.padding = "0"
}

function addInfoElement(table, pokemon, headerText, content){
	var row = newTag("tr", table)
	var header = newTag("th", row)
	var text = newTag("td", row)
	header.innerHTML = headerText
	text.innerHTML = content
	return text
}

function showStatSection(pokemon){
	addStatElement(pokemon, "HP |", "hp")
	addStatElement(pokemon, "Attack |", "atk")
	addStatElement(pokemon, "Defense |", "def")
	addStatElement(pokemon, "Sp. Atk |", "spa")
	addStatElement(pokemon, "Sp. Def |", "spd")
	addStatElement(pokemon, "Speed |", "spe")
}

function addStatElement(pokemon, headerText, stat){
	var row = newTag("tr", statSectionTable)
	var header = newTag("th", row)
	var text = newTag("td", row)
	var barElement = newTag("td", row)
	header.innerHTML = headerText
	var statBase = pokemon.stats[stat]
	var ivBase = pokemon.ivs ? pokemon.ivs[stat] : 0
	var evBase = pokemon.evs ? pokemon.evs[stat] : 0
	text.innerHTML = statBase
	text.className = pokemon.nature ? getNatureCssClass(stat,pokemon) : ""
	var bar = newTag("div", barElement)
	bar.className = "stat-bar base-bar"
	bar.style.width = statBase*2 + "px"
	bar.style.background = "linear-gradient(to right, red, "+getStatColor(statBase)+")"
	if(pokemon.ivs || pokemon.evs){
		text.innerHTML += " · " + ivBase + " · " + evBase
		bar = newTag("div", barElement)
		bar.className = "stat-bar iv-bar"
		bar.style.width = ivBase + "px"
		bar = newTag("div", barElement)
		bar.className = "stat-bar ev-bar"
		bar.style.width = evBase/4 + "px"
	}
}

var groupsStuff = []
function showMovesSection(pokemon){
	var moveGroups = {}
	for(var i in pokemon.moves){
		var method = pokemon.moves[i].method
		var level = +method
		if(level)
			method = "level"
		if(!moveGroups[method])
			moveGroups[method] = []
		moveGroups[method].push({move: moves[pokemon.moves[i].name], level: level})
	}
	for(var key in moveGroups)
		groupsStuff.push({key:key, group: moveGroups[key]})
	setTimeout(addMoveGroup, 0)
}

var nextMoveGroup = 0

function addMoveGroup(){
	if(!groupsStuff[nextMoveGroup]) return
	var moveThing = groupsStuff[nextMoveGroup]
	fillMoveTable(document.getElementById("moves-" + moveThing.key), moveThing.group, moveThing.key)
	nextMoveGroup++
	setTimeout(addMoveGroup, 0)
}

function fillMoveTable(table, moveGroup, method){
	addMoveHeader(table.children[0], moveGroup, method)
	for(var i in moveGroup){
		addMoveRow(table.children[1], moveGroup[i].move, moveGroup[i].level, i, method)
	}
}

function addMoveHeader(table, moveGroup, method){
	var row = newTag("tr", table)
	var title = "Learnt somehow"
	switch(method){
		case "level": title = "Learnt by level up:"; break;
		case "evolution": title = "Learnt by evolution:"; break;
		case "egg": title = "Learnt as egg move:"; break;
		case "tm": title = "Learnt by TM:"; break;
		case "tutor": title = "Learnt by tutor:"; break;
	}
	var titleRow = newTag("td", row)
	titleRow.innerHTML = title
	titleRow.colSpan = "8"
	titleRow.style.fontWeight = "bold"
	row = newTag("tr", table)
	newTag("td", row).innerHTML = "Move"
	if(method == "level")
		newTag("td", row).innerHTML = "Level"
	if(method == "tm")
		newTag("td", row).innerHTML = "TM"
	newTag("td", row).innerHTML = "Type"
	newTag("td", row).innerHTML = "Category"
	newTag("td", row).innerHTML = "Power"
	newTag("td", row).innerHTML = "Accuracy"
	newTag("td", row).innerHTML = "Priority"
	newTag("td", row).innerHTML = "PP"
	newTag("td", row).innerHTML = "Summary"
}

function addMoveRow(table, move, level, i, method){
	var row = newTag("tr", table)
	var head = newTag("td", row)
	head.innerHTML = move.name
	head.style.fontWeight = "bold"
	if(method == "level")
		newTag("td", row).innerHTML = level
	if(method == "tm")
		newTag("td", row).innerHTML = move.gameDescription
	newTag("td", row).innerHTML = getTypeText(move.type)
	newTag("td", row).innerHTML = move.category
	newTag("td", row).innerHTML = move.power
	newTag("td", row).innerHTML = move.accuracy
	newTag("td", row).innerHTML = move.priority
	newTag("td", row).innerHTML = move.pp.split(" ")[0]
	newTag("td", row).innerHTML = move.gameDescription
	row.className = i%2?"odd":"even"
}

function toggleShowMoves(){
	showMoves = !showMoves
	if(showMoves){
		movesHeader.innerHTML = "Moves ▼"
		movesSection.className = "shown-moves"
		pokemonInfo.style.maxHeight = "1000rem"
	} else {
		movesHeader.innerHTML = "Moves ▶"
		movesSection.className = "hidden-moves"
		pokemonInfo.style.maxHeight = "none"
	}
}
movesHeader.onclick = toggleShowMoves

function clearPokemonInfo(){
	while (statSectionTable.firstChild)
		statSectionTable.removeChild(statSectionTable.firstChild)
	while (infoSectionTable.firstChild)
		infoSectionTable.removeChild(infoSectionTable.firstChild)
	while (infoBSectionTable.firstChild)
		infoBSectionTable.removeChild(infoBSectionTable.firstChild)
	for(var i=0;i<2;i++){
	while (movesLevelTable.children[i].firstChild)
		movesLevelTable.children[i].removeChild(movesLevelTable.children[i].firstChild)
	while (movesEvolutionTable.children[i].firstChild)
		movesEvolutionTable.children[i].removeChild(movesEvolutionTable.children[i].firstChild)
	while (movesEggTable.children[i].firstChild)
		movesEggTable.children[i].removeChild(movesEggTable.children[i].firstChild)
	while (movesTmTable.children[i].firstChild)
		movesTmTable.children[i].removeChild(movesTmTable.children[i].firstChild)
	while (movesTutorTable.children[i].firstChild)
		movesTutorTable.children[i].removeChild(movesTutorTable.children[i].firstChild)
	}
}

function getTypeText(type){
	return "<span style='color:" + typeColors[type] + ";'>"+ type + "</span>"
}

function getTypesText(pokemon){
	return getTypeText(pokemon.types[0]) + (pokemon.types[1] ? " · " + getTypeText(pokemon.types[1]) : "")
}

function getAbilityText(ability, hidden){
	return "<span" + (hidden ? " style='font-style: italic;'" : "") + ">"+ ability + "</span>"
}

function getAbilitiesText(pokemon){
	var text = getAbilityText(pokemon.abilities[0])
	if(pokemon.abilities[1])
		text += " · " + getAbilityText(pokemon.abilities[1])
	if(pokemon.abilities[2])
		text += " · " + getAbilityText(pokemon.abilities[2], true)
	return text
}

function getEggGroupText(eggGroup){
	return "<span>"+ eggGroup + "</span>"
}

function getEggGroupsText(pokemon){
	if(!pokemon.eggGroups) return "—"
	var text = getEggGroupText(pokemon.eggGroups[0])
	if(pokemon.eggGroups[1])
		text += " · " + getEggGroupText(pokemon.eggGroups[1])
	return text
}

function getGenderText(pokemon){
	if(pokemon.gender){
		if(pokemon.gender == "♂" || pokemon.gender.toLowerCase() == "m" || pokemon.gender.toLowerCase() == "male")
			return "<span style='color: #34d1ba;'>♂</span>"
		if(pokemon.gender == "♀" || pokemon.gender.toLowerCase() == "f" || pokemon.gender.toLowerCase() == "female")
			return "<span style='color: #f97272;'>♀</span>"
		if((pokemon.ratio || pokemon.ratio == "—") && pokemon.gender == "—" || pokemon.gender.toLowerCase() == "-" || pokemon.gender.toLowerCase() == "none")
			return "—"
	}
	if(!pokemon.ratio || pokemon.ratio == "—") return "—"
	var things = pokemon.ratio.split(":")
	return "<span style='color: #34d1ba;'>"+ things[0] + "♂</span>:<span style='color: #f97272;'>"+ things[1] + "♀</span>"
}

function getWeightHeightText(pokemon){
	var text = "-"
	if(pokemon.weight)
		text = pokemon.weight
	text += " / "
	if(pokemon.height)
		text += pokemon.height
	else
		text += "-"
	return text
}

function getBallsText(pokemon){
	var text = ""
	for(var i in pokemon.balls){
		var ball = pokemon.balls[i].split(" ")[0].toLowerCase()
		ball = ball.split("ball")[0].replace("é","e")
		var url = "https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokeball/"+ball+".png"
		text += "<img src='"+url+"' title='" + pokemon.balls[i] + "'></img>"
	}
	return text
}

function getStatText(stat){
	return "<span style='color:"+getStatColor(stat)+"'>" + stat + "</span>"
}

function getStatColor(stat){
	return "rgb("+HSVtoRGB(0.6*stat/255, 1, 1)+")"
}

function getAmountShinyText(pokemon){
	return " " + (pokemon.shiny ? "<span style='color:#f11;'>★</span>" : "") + (pokemon.amount ? " (" + pokemon.amount + ")" : "")
}

function getIVText(iv, pokemon) {
	var cssClass = getNatureCssClass(iv,pokemon)
	return "<span class='"+cssClass+"'>"+pokemon.ivs[iv]+"</span>"
}

function getNatureCssClass(stat,pokemon){
	var nature = natures[pokemon.nature]
	if(nature.positive == nature.negative)
		return ""
	else if(stat == parseStatType(nature.positive))
		return "positive-nature"
	else if(stat == parseStatType(nature.negative))
		return "negative-nature"
}

function parseStatType(text){
	if(["hp","health"].indexOf(text.trim().toLowerCase())>-1)
		return "hp"
	if(["atk","attack"].indexOf(text.trim().toLowerCase())>-1)
		return "atk"
	if(["def","defense"].indexOf(text.trim().toLowerCase())>-1)
		return "def"
	if(["spa","sp. atk","sp. attack","special attack"].indexOf(text.trim().toLowerCase())>-1)
		return "spa"
	if(["spd","sp. def","sp. defense","special defense"].indexOf(text.trim().toLowerCase())>-1)
		return "spd"
	if(["spe","speed"].indexOf(text.trim().toLowerCase()))
		return "spe"
}

function HSVtoRGB(h, s, v) {
		var r, g, b, i, f, p, q, t
		i = Math.floor(h * 6)
		f = h * 6 - i
		p = v * (1 - s)
		q = v * (1 - f * s)
		t = v * (1 - (1 - f) * s)
		switch (i % 6) {
			case 0: r = v, g = t, b = p; break;
			case 1: r = q, g = v, b = p; break;
			case 2: r = p, g = v, b = t; break;
			case 3: r = p, g = q, b = v; break;
			case 4: r = t, g = p, b = v; break;
			case 5: r = v, g = p, b = q; break;
		}
		return Math.round(r * 255) + "," + Math.round(g * 255) + "," + Math.round(b * 255)
	}