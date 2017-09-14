"use strict";

class PokemonColumn {
	constructor(columnHeader, column) {
		this.columnHeader = columnHeader
		this.column = column
	}
}

class ListSection {
	constructor() {
		this.nextPoke = 0
		this.nextLimit = 50

		this.basePokemonColumns = [
			new PokemonColumn("", (pokemon) => "<img src='" + PokeText.spriteName(pokemon) + "'/>"),
			new PokemonColumn("Pokemon", (pokemon) => PokeText.formName(pokemon) + (pokemon.nickname ? " [" + pokemon.nickname + "]" : "")),
			new PokemonColumn("Types", (pokemon) => PokeText.types(pokemon)),
			new PokemonColumn("Abilities", (pokemon) => PokeText.abilities(pokemon)),
			new PokemonColumn("HP", (pokemon) => PokeText.stat(pokemon.stats.hp)),
			new PokemonColumn("Atk", (pokemon) => PokeText.stat(pokemon.stats.atk)),
			new PokemonColumn("Def", (pokemon) => PokeText.stat(pokemon.stats.def)),
			new PokemonColumn("SpA", (pokemon) => PokeText.stat(pokemon.stats.spa)),
			new PokemonColumn("SpD", (pokemon) => PokeText.stat(pokemon.stats.spd)),
			new PokemonColumn("Spe", (pokemon) => PokeText.stat(pokemon.stats.spe)),
			new PokemonColumn("Egg groups", (pokemon) => PokeText.eggGroups(pokemon))
		]

		this.tabPokemonColumns = [
			new PokemonColumn("", (pokemon) => "<img src='" + PokeText.spriteName(pokemon) + "'/>"),
			new PokemonColumn("Pokemon", (pokemon) =>
				PokeText.formName(pokemon) +
				(pokemon.gender && pokemon.gender != "—" ? " " + PokeText.gender(pokemon) : "") +
				PokeText.amountShiny(pokemon) +
				(pokemon.nickname ? " [" + pokemon.nickname + "]" : "")
			),
			new PokemonColumn("Types", (pokemon) => PokeText.types(pokemon)),
			new PokemonColumn("Abilities", (pokemon) => {
				if (pokemon.ability)
					return PokeText.ability(pokemon.ability, pokemon.abilities[2] ? pokemon.abilities[2].toLowerCase() == pokemon.ability.split("(")[0].trim().toLowerCase() : false)
				return PokeText.abilities(pokemon)
			}),
			new PokemonColumn("Nature", (pokemon) => pokemon.nature ? pokemon.nature : ""),
			new PokemonColumn("HP", (pokemon) => PokeText.IVEV("hp", pokemon)),
			new PokemonColumn("Atk", (pokemon) => PokeText.IVEV("atk", pokemon)),
			new PokemonColumn("Def", (pokemon) => PokeText.IVEV("def", pokemon)),
			new PokemonColumn("SpA", (pokemon) => PokeText.IVEV("spa", pokemon)),
			new PokemonColumn("SpD", (pokemon) => PokeText.IVEV("spd", pokemon)),
			new PokemonColumn("Spe", (pokemon) => PokeText.IVEV("spe", pokemon)),
			new PokemonColumn("Moves", (pokemon) => pokemon.learntMoves ? pokemon.learntMoves.join(", ") : ""),
			new PokemonColumn("Ball", (pokemon) => PokeText.balls(pokemon))
		]

		this.listElement = document.getElementById("pokemon-list")
		this.gridElement = document.getElementById("pokemon-grid")
	}

	show() {
		this.nextPoke = 0
		this.nextLimit = 50
		while (this.listElement.children[0].firstChild)
			this.listElement.children[0].removeChild(this.listElement.children[0].firstChild)
		while (this.listElement.children[1].firstChild)
			this.listElement.children[1].removeChild(this.listElement.children[1].firstChild)
		while (this.gridElement.firstChild)
			this.gridElement.removeChild(this.gridElement.firstChild)
		if (stuff.state.mode == "table") {
			this.listElement.style.display = "table"
			this.gridElement.style.display = "none"
			this.setUpTableHeader()
		} else {
			this.listElement.style.display = "none"
			this.gridElement.style.display = "initial"
		}
		this.addNextPokemonEntry()
	}

	addNextPokemonEntry() {
		if (!stuff.state.currentPokemons[this.nextPoke]) {
			this.nextPoke = 0
			return
		}
		if (this.nextPoke > this.nextLimit) {
			this.nextLimit += stuff.state.mode == "grid" ? 50 : 25
			return
		}
		if (stuff.state.mode == "table")
			this.addPokemonListElement(stuff.state.currentPokemons[this.nextPoke])
		else
			this.addPokemonGridElement(stuff.state.currentPokemons[this.nextPoke])
		this.nextPoke++
		setTimeout(() => { this.addNextPokemonEntry() }, 0)
	}

	setUpTableHeader() {
		var tableHeader = newTag("tr", this.listElement.children[0])
		//tableHeader.onclick = showMarkdownTable
		var columns = this.basePokemonColumns
		if (stuff.state.currentPokemons[0] && stuff.state.currentPokemons[0].base && stuff.state.completionMode == "normal")
			columns = this.tabPokemonColumns
		for (var i in columns) {
			var element = newTag("th", tableHeader)
			element.innerHTML = columns[i].columnHeader
		}
	}

	loadMoreWhenScrolledDown() {
		var main = document.getElementById("main")
		if (main.scrollTop > main.scrollHeight - main.clientHeight - 200) {
			if (this.nextPoke)
				this.addNextPokemonEntry()
		}
	}

	addPokemonListElement(pokemon) {
		var pokeElement = newTag("tr", this.listElement.children[1])
		var columns = this.basePokemonColumns
		if (stuff.state.currentPokemons[0] && stuff.state.currentPokemons[0].base && stuff.state.completionMode == "normal")
			columns = this.tabPokemonColumns
		for (var i in columns) {
			var element = newTag("th", pokeElement)
			element.innerHTML = columns[i].column(pokemon)
		}
		pokeElement.onclick = function () {
			// selectPokemon(pokemon, pokeElement)
		}
		if (this.nextPoke % 2)
			pokeElement.className = pokemon.got ? "got-odd" : "odd"
		else
			pokeElement.className = pokemon.got ? "got-even" : "even"
	}

	addPokemonGridElement(pokemon) {
		var pokeElement = newTag("li", this.gridElement)
		if (pokemon.got)
			pokeElement.className = "got"
		pokeElement.innerHTML = "<img src='" + PokeText.spriteName(pokemon) + "'/>"
		pokeElement.onclick = function () {
			// selectPokemon(pokemon)
		}
	}
}