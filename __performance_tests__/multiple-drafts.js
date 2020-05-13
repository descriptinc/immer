"use strict"

import {measure} from "./measure"
import produce, {
	setAutoFreeze,
	setUseProxies,
	enableAllPlugins
} from "../dist/immer.cjs.production.min.js"
import cloneDeep from "lodash.clonedeep"
import {fromJS} from "immutable"
import Seamless from "seamless-immutable"
import deepFreeze from "deep-freeze"

enableAllPlugins()

console.log(
	"\n# multiple-drafts - loading large set of data and updating a Set\n"
)

const dataSet = require("./data.json")
const baseState = {
	data: null,
	data2: new Set()
}
const frozenBazeState = deepFreeze(cloneDeep(baseState))

const MAX = 1000

measure("immer (proxy) - without autofreeze * " + MAX, () => {
	setUseProxies(true)
	setAutoFreeze(false)
	for (let i = 0; i < MAX; i++)
		produce(baseState, draft => {
			draft.data = dataSet
			draft.data2.add(1)
		})
})

measure("immer (proxy) - with autofreeze * " + MAX, () => {
	setUseProxies(true)
	setAutoFreeze(true)
	for (let i = 0; i < MAX; i++)
		produce(frozenBazeState, draft => {
			draft.data = dataSet
			draft.data2.add(1)
		})
})
