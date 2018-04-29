require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "d6ecbbd8a346082ad21d"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	if(unacceptedModules.length > 0) {
		log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if(typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog = (logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if(shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if(shouldLog(level)) {
		if(level === "info") {
			console.log(msg);
		} else if(level === "warning") {
			console.warn(msg);
		} else if(level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if(module.hot.status() === "idle") {
			module.hot.check(true).then(function(updatedModules) {
				if(!updatedModules) {
					if(fromUpdate) log("info", "[HMR] Update applied.");
					return;
				}
				__webpack_require__("./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
				checkForUpdate(true);
			}).catch(function(err) {
				var status = module.hot.status();
				if(["abort", "fail"].indexOf(status) >= 0) {
					log("warning", "[HMR] Cannot apply update.");
					log("warning", "[HMR] " + err.stack || err.message);
					log("warning", "[HMR] You need to restart the application!");
				} else {
					log("warning", "[HMR] Update failed: " + err.stack || err.message);
				}
			});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ }),

/***/ "./src/api/graphQLRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return graphQLRouter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools__ = __webpack_require__("graphql-tools");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources_user__ = __webpack_require__("./src/api/resources/user/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resources_song__ = __webpack_require__("./src/api/resources/song/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resources_playlist__ = __webpack_require__("./src/api/resources/playlist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resources_ctSegment__ = __webpack_require__("./src/api/resources/ctSegment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resources_partner__ = __webpack_require__("./src/api/resources/partner/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resources_partnerSegment__ = __webpack_require__("./src/api/resources/partnerSegment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_merge__ = __webpack_require__("lodash.merge");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_apollo_server_express__ = __webpack_require__("apollo-server-express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_apollo_server_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_apollo_server_express__);










var baseSchema = '\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n';

var schema = Object(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__["makeExecutableSchema"])({
	typeDefs: [baseSchema, __WEBPACK_IMPORTED_MODULE_1__resources_user__["c" /* userType */], __WEBPACK_IMPORTED_MODULE_2__resources_song__["c" /* songType */], __WEBPACK_IMPORTED_MODULE_3__resources_playlist__["c" /* playlistType */], __WEBPACK_IMPORTED_MODULE_5__resources_partner__["b" /* partnerType */], __WEBPACK_IMPORTED_MODULE_4__resources_ctSegment__["b" /* ctSegmentType */], __WEBPACK_IMPORTED_MODULE_6__resources_partnerSegment__["b" /* partnerSegmentType */]],
	resolvers: __WEBPACK_IMPORTED_MODULE_7_lodash_merge___default()({}, __WEBPACK_IMPORTED_MODULE_1__resources_user__["a" /* userResolvers */], __WEBPACK_IMPORTED_MODULE_2__resources_song__["a" /* songResolvers */], __WEBPACK_IMPORTED_MODULE_3__resources_playlist__["a" /* playlistResolvers */], __WEBPACK_IMPORTED_MODULE_5__resources_partner__["a" /* partnerResolvers */], __WEBPACK_IMPORTED_MODULE_4__resources_ctSegment__["a" /* ctSegmentResolvers */], __WEBPACK_IMPORTED_MODULE_6__resources_partnerSegment__["a" /* partnerSegmentResolvers */])
});

var graphQLRouter = Object(__WEBPACK_IMPORTED_MODULE_8_apollo_server_express__["graphqlExpress"])(function (req) {
	return {
		schema: schema,
		context: {
			req: req,
			user: req.user
		}
	};
});

/***/ }),

/***/ "./src/api/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__restRouter__ = __webpack_require__("./src/api/restRouter.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__restRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__graphQLRouter__ = __webpack_require__("./src/api/graphQLRouter.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__graphQLRouter__["a"]; });



/***/ }),

/***/ "./src/api/modules/auth.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return signin; });
/* unused harmony export decodeToken */
/* unused harmony export getFreshUser */
/* unused harmony export verifyUser */
/* unused harmony export signToken */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return protect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources_user_user_model__ = __webpack_require__("./src/api/resources/user/user.model.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__ = __webpack_require__("jsonwebtoken");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__("./src/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express_jwt__ = __webpack_require__("express-jwt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_express_jwt__);





var checkToken = __WEBPACK_IMPORTED_MODULE_3_express_jwt___default()({
	secret: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].secrets.JWT_SECRET
});

var signin = function signin(req, res, next) {
	// req.user will be there from the middleware
	// verify user. Then we can just create a token
	// and send it back for the client to consume
	var token = signToken(req.user.id);
	res.json({ token: token });
};

var decodeToken = function decodeToken() {
	return function (req, res, next) {
		if (__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].disableAuth) {
			return next();
		}
		// make it optional to place token on query string
		// if it is, place it on the headers where it should be
		// so checkToken can see it. See follow the 'Bearer 034930493' format
		// so checkToken can see it and decode it
		if (req.query && req.query.hasOwnProperty('access_token')) {
			req.headers.authorization = 'Bearer ' + req.query.access_token;
		}

		// this will call next if token is valid
		// and send error if its not. It will attached
		// the decoded token to req.user
		checkToken(req, res, next);
	};
};

var getFreshUser = function getFreshUser() {
	return function (req, res, next) {
		return __WEBPACK_IMPORTED_MODULE_0__resources_user_user_model__["a" /* User */].findById(req.user.id).then(function (user) {
			if (!user) {
				// if no user is found it was not
				// it was a valid JWT but didn't decode
				// to a real user in our DB. Either the user was deleted
				// since the client got the JWT, or
				// it was a JWT from some other source
				res.status(401).send('Unauthorized');
			} else {
				// update req.user with fresh user from
				// stale token data
				req.user = user;
				next();
			}
		}).catch(function (error) {
			return next(error);
		});
	};
};

var verifyUser = function verifyUser() {
	return function (req, res, next) {
		var username = req.body.username;
		var password = req.body.password;

		// if no username or password then send
		if (!username || !password) {
			res.status(400).send('You need a username and password');
			return;
		}

		// look user up in the DB so we can check
		// if the passwords match for the username
		__WEBPACK_IMPORTED_MODULE_0__resources_user_user_model__["a" /* User */].findOne({ username: username }).then(function (user) {
			if (!user) {
				res.status(401).send('No user with the given username');
			} else {
				// checking the passowords here
				if (!user.authenticate(password)) {
					res.status(401).send('Wrong password');
				} else {
					// if everything is good,
					// then attach to req.user
					// and call next so the controller
					// can sign a token from the req.user._id
					req.user = user;
					next();
				}
			}
		}).catch(function (error) {
			return next(err);
		});
	};
};

var signToken = function signToken(id) {
	return __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken___default.a.sign({ id: id }, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].secrets.JWT_SECRET, {
		expiresIn: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].expireTime
	});
};

var protect = [decodeToken(), getFreshUser()];

/***/ }),

/***/ "./src/api/modules/errorHandler.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return apiErrorHandler; });
var apiErrorHandler = function apiErrorHandler(error, req, res, next) {
	console.error(error.stack);
	res.status(500).send(error.message || error.toString());
};

/***/ }),

/***/ "./src/api/modules/query.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export controllers */
/* unused harmony export createOne */
/* unused harmony export updateOne */
/* unused harmony export deleteOne */
/* unused harmony export getOne */
/* unused harmony export getAll */
/* unused harmony export findByParam */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return generateControllers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__("babel-runtime/helpers/extends");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__ = __webpack_require__("babel-runtime/core-js/promise");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_merge__ = __webpack_require__("lodash.merge");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash_merge__);





var _this = this;



var controllers = {
	createOne: function createOne(model, body) {
		return model.create(body);
	},
	updateOne: function updateOne(docToUpdate, update) {
		__WEBPACK_IMPORTED_MODULE_4_lodash_merge___default()(docToUpdate, update);
		return docToUpdate.save();
	},
	deleteOne: function deleteOne(docToDelete) {
		return docToDelete.remove();
	},
	getOne: function getOne(docToGet) {
		return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default.a.resolve(docToGet);
	},
	getAll: function getAll(model) {
		return model.find({});
	},
	findByParam: function findByParam(model, id) {
		return model.findById(id);
	}
};

var createOne = function createOne(model) {
	return function (req, res, next) {
		return controllers.createOne(model, req.body).then(function (doc) {
			return res.status(201).json(doc);
		}).catch(function (error) {
			return next(error);
		});
	};
};

var updateOne = function updateOne(model) {
	return function () {
		var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee(req, res, next) {
			var docToUpdate, update;
			return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							docToUpdate = req.docFromId;
							update = req.body;
							return _context.abrupt('return', controllers.updateOne(docToUpdate, update).then(function (doc) {
								return res.status(201).json(doc);
							}).catch(function (error) {
								return next(error);
							}));

						case 3:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}));

		return function (_x, _x2, _x3) {
			return _ref.apply(this, arguments);
		};
	}();
};

var deleteOne = function deleteOne(model) {
	return function (req, res, next) {
		return controllers.deleteOne(req.docFromId).then(function (doc) {
			return res.status(201).json(doc);
		}).catch(function (error) {
			return next(error);
		});
	};
};

var getOne = function getOne(model) {
	return function (req, res, next) {
		return controllers.getOne(req.docToUpdate).then(function (doc) {
			return res.status(200).json(doc);
		}).catch(function (error) {
			return next(error);
		});
	};
};

var getAll = function getAll(model) {
	return function (req, res, next) {
		return controllers.getAll(model).then(function (docs) {
			return res.json(docs);
		}).catch(function (error) {
			return next(error);
		});
	};
};

var findByParam = function findByParam(model) {
	return function (req, res, next, id) {
		return controllers.findByParam(model, id).then(function (doc) {
			if (!doc) {
				next(new Error('Not Found Error'));
			} else {
				req.docFromId;
				next();
			}
		}).catch(function (error) {
			next(error);
		});
	};
};

var generateControllers = function generateControllers(model) {
	var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var defaults = {
		findByParam: findByParam(model),
		getAll: getAll(model),
		getOne: getOne(model),
		deleteOne: deleteOne(model),
		updateOne: updateOne(model),
		createOne: createOne(model)
	};

	return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, defaults, overrides);
};

/***/ }),

/***/ "./src/api/resources/ctSegment/ctSegment.graphQLRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ctSegment_graphql__ = __webpack_require__("./src/api/resources/ctSegment/ctSegment.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ctSegment_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ctSegment_graphql__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__ctSegment_graphql__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ctSegment_resolvers__ = __webpack_require__("./src/api/resources/ctSegment/ctSegment.resolvers.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__ctSegment_resolvers__["a"]; });





/***/ }),

/***/ "./src/api/resources/ctSegment/ctSegment.graphql":
/***/ (function(module, exports) {

module.exports = "type CtSegment {\n\tid: ID\n\tidPanel: Int!\n\tname: String!\n}\n\ninput NewCtSegment {\n\tidPanel: Int!\n\tname: String!\n}\n\nextend type Query {\n\tCtSegment(id: ID!): CtSegment!\n\tallCtSegments: [CtSegment]!\n}\n\nextend type Mutation {\n\tnewCtSegment(input: NewCtSegment!): CtSegment!\n}\n"

/***/ }),

/***/ "./src/api/resources/ctSegment/ctSegment.model.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CtSegment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var ctSegmentSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
	idPanel: {
		type: Number,
		unique: true,
		required: [true, 'CT segment must have system id.']
	},

	name: {
		type: String,
		required: [true, 'Segment must have name.']
	}
}, { timestamps: true });

var CtSegment = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('CtSegment', ctSegmentSchema);

/***/ }),

/***/ "./src/api/resources/ctSegment/ctSegment.resolvers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ctSegmentResolvers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ctSegment_model__ = __webpack_require__("./src/api/resources/ctSegment/ctSegment.model.js");


var getCtSegment = function getCtSegment(_, _ref, _ref2) {
	var id = _ref.id;
	var user = _ref2.user;
	return __WEBPACK_IMPORTED_MODULE_0__ctSegment_model__["a" /* CtSegment */].findById(id).exec();
};

var allCtSegments = function allCtSegments() {
	return __WEBPACK_IMPORTED_MODULE_0__ctSegment_model__["a" /* CtSegment */].find({}).exec();
};

var newCtSegment = function newCtSegment(_, _ref3) {
	var input = _ref3.input;
	return __WEBPACK_IMPORTED_MODULE_0__ctSegment_model__["a" /* CtSegment */].create(input);
};

var ctSegmentResolvers = {
	Query: {
		allCtSegments: allCtSegments,
		CtSegment: getCtSegment
	},
	Mutation: {
		newCtSegment: newCtSegment
	}
};

/***/ }),

/***/ "./src/api/resources/ctSegment/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ctSegment_graphQLRouter__ = __webpack_require__("./src/api/resources/ctSegment/ctSegment.graphQLRouter.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ctSegment_graphQLRouter__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__ctSegment_graphQLRouter__["b"]; });


/***/ }),

/***/ "./src/api/resources/partner/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partner_graphQLRouter__ = __webpack_require__("./src/api/resources/partner/partner.graphQLRouter.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__partner_graphQLRouter__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__partner_graphQLRouter__["b"]; });


/***/ }),

/***/ "./src/api/resources/partner/partner.graphQLRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partner_graphql__ = __webpack_require__("./src/api/resources/partner/partner.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partner_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partner_graphql__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__partner_graphql__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partner_resolvers__ = __webpack_require__("./src/api/resources/partner/partner.resolvers.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__partner_resolvers__["a"]; });





/***/ }),

/***/ "./src/api/resources/partner/partner.graphql":
/***/ (function(module, exports) {

module.exports = "type Partner {\n\tid: ID\n\tname: String!\n}\n\ninput UpdatePartner {\n\tid: ID!\n\tname: String!\n}\n\ninput NewPartner {\n\tname: String!\n}\n\nextend type Query {\n\tPartner(id: ID!): Partner!\n\tallPartners: [Partner]!\n}\n\nextend type Mutation {\n\tnewPartner(input: NewPartner!): Partner!\n}\n"

/***/ }),

/***/ "./src/api/resources/partner/partner.model.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Partner; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var partnerSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	}
}, { timestamps: true });

var Partner = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Partner', partnerSchema);

/***/ }),

/***/ "./src/api/resources/partner/partner.resolvers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return partnerResolvers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partner_model__ = __webpack_require__("./src/api/resources/partner/partner.model.js");


var getPartner = function getPartner(_, _ref, _ref2) {
	var id = _ref.id;
	var user = _ref2.user;
	return __WEBPACK_IMPORTED_MODULE_0__partner_model__["a" /* Partner */].findById(id).exec();
};

var allPartners = function allPartners() {
	return __WEBPACK_IMPORTED_MODULE_0__partner_model__["a" /* Partner */].find({}).exec();
};

var newPartner = function newPartner(_, _ref3) {
	var input = _ref3.input;
	return __WEBPACK_IMPORTED_MODULE_0__partner_model__["a" /* Partner */].create(input);
};

var partnerResolvers = {
	Query: {
		allPartners: allPartners,
		Partner: getPartner
	},
	Mutation: {
		newPartner: newPartner
	}
};

/***/ }),

/***/ "./src/api/resources/partnerSegment/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partnerSegment_graphQLRouter__ = __webpack_require__("./src/api/resources/partnerSegment/partnerSegment.graphQLRouter.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__partnerSegment_graphQLRouter__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__partnerSegment_graphQLRouter__["b"]; });


/***/ }),

/***/ "./src/api/resources/partnerSegment/partnerSegment.graphQLRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partnerSegment_graphql__ = __webpack_require__("./src/api/resources/partnerSegment/partnerSegment.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partnerSegment_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partnerSegment_graphql__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__partnerSegment_graphql__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partnerSegment_resolvers__ = __webpack_require__("./src/api/resources/partnerSegment/partnerSegment.resolvers.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__partnerSegment_resolvers__["a"]; });





/***/ }),

/***/ "./src/api/resources/partnerSegment/partnerSegment.graphql":
/***/ (function(module, exports) {

module.exports = "type PartnerSegment {\n\tid: ID!\n\tplatformId: Int!\n\tname: String!\n\tpartner: Partner\n}\n\ninput NewPartnerSegment {\n\tpatformId: Int!\n\tname: String!\n    partner: NewPartner\n}\n\ninput EditPartnerSegment {\n\tpartnerId: Int\n\tname: String\n    partner: NewPartner\n}\n\nextend type Query {\n\tPartnerSegment(id: ID!): PartnerSegment!\n\tallPartnerSegments: [PartnerSegment]!\n}\n\nextend type Mutation {\n\tnewPartnerSegment(input: NewPartnerSegment): PartnerSegment!\n}\n"

/***/ }),

/***/ "./src/api/resources/partnerSegment/partnerSegment.model.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartnerSegment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var partnerSegmentSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
	platformId: {
		type: Number,
		unique: false,
		required: [true, 'Partner segment must have partner system id.']
	},
	name: {
		type: String,
		required: [true, 'Segment must have name.']
	},
	partner: {
		type: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema.Types.ObjectId,
		ref: 'partner'
	}
}, { timestamps: true });

var PartnerSegment = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('PartnerSegment', partnerSegmentSchema);

/***/ }),

/***/ "./src/api/resources/partnerSegment/partnerSegment.resolvers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return partnerSegmentResolvers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partnerSegment_model__ = __webpack_require__("./src/api/resources/partnerSegment/partnerSegment.model.js");


var getPartnerSegment = function getPartnerSegment(_, _ref, _ref2) {
	var id = _ref.id;
	var user = _ref2.user;
	return __WEBPACK_IMPORTED_MODULE_0__partnerSegment_model__["a" /* PartnerSegment */].findById(id).exec();
};

var allPartnerSegments = function allPartnerSegments(_, __, ___) {
	return PartnerSegments.find({}).exec();
};

var newPartnerSegment = function newPartnerSegment(_, _ref3) {
	var input = _ref3.input;
	return __WEBPACK_IMPORTED_MODULE_0__partnerSegment_model__["a" /* PartnerSegment */].create(input);
};

var partnerSegmentResolvers = {
	Query: {
		allPartnerSegments: allPartnerSegments,
		PartnerSegment: getPartnerSegment
	},
	Mutation: {
		newPartnerSegment: newPartnerSegment
	}
};

/***/ }),

/***/ "./src/api/resources/playlist/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__playlist_restRouter__ = __webpack_require__("./src/api/resources/playlist/playlist.restRouter.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__playlist_restRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playlist_graphQLRouter__ = __webpack_require__("./src/api/resources/playlist/playlist.graphQLRouter.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__playlist_graphQLRouter__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__playlist_graphQLRouter__["b"]; });



/***/ }),

/***/ "./src/api/resources/playlist/playlist.controller.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_query__ = __webpack_require__("./src/api/modules/query.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playlist_model__ = __webpack_require__("./src/api/resources/playlist/playlist.model.js");



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__modules_query__["a" /* generateControllers */])(__WEBPACK_IMPORTED_MODULE_1__playlist_model__["a" /* Playlist */]));

/***/ }),

/***/ "./src/api/resources/playlist/playlist.graphQLRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__playlist_graphql__ = __webpack_require__("./src/api/resources/playlist/playlist.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__playlist_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__playlist_graphql__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__playlist_graphql__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playlist_resolvers__ = __webpack_require__("./src/api/resources/playlist/playlist.resolvers.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__playlist_resolvers__["playlistResolvers"]; });





/***/ }),

/***/ "./src/api/resources/playlist/playlist.graphql":
/***/ (function(module, exports) {

module.exports = "type Playlist {\n\ttitle: String!\n\tsongs: [Song]!\n\tfavorite: Boolean!\n}\n\ninput UpdatedPlaylist {\n\tid: ID!\n\ttitle: String\n\tsongs: [NewSong]\n\tfavorite: Boolean\n}\n\nextend type Query {\n\tPlaylist(id: ID!): Playlist!\n}\n\nextend type Mutation {\n\tupdatePlaylist(input: UpdatedPlaylist): Playlist!\n}\n"

/***/ }),

/***/ "./src/api/resources/playlist/playlist.model.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Playlist; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var playlistSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
	title: {
		type: String,
		required: [true, 'Playlist must have title']
	},

	songs: [{
		type: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema.Types.ObjectId,
		ref: 'song'
	}],

	favorite: {
		type: Boolean,
		required: true,
		default: false
	}
});

var Playlist = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('playlist', playlistSchema);

/***/ }),

/***/ "./src/api/resources/playlist/playlist.resolvers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export songResolvers */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__playlist_model__ = __webpack_require__("./src/api/resources/playlist/playlist.model.js");


var getPlaylist = function getPlaylist(_, __, _ref) {
	var user = _ref.user;

	return user;
};

var updatePlaylist = function updatePlaylist(_, _ref2) {
	var input = _ref2.input;
};

var songResolvers = {
	Query: {
		Playlist: getPlaylist
	},
	Mutation: {
		updatePlaylist: updatePlaylist
	}
};

/***/ }),

/***/ "./src/api/resources/playlist/playlist.restRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return playlistRouter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playlist_controller__ = __webpack_require__("./src/api/resources/playlist/playlist.controller.js");



var playlistRouter = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

playlistRouter.param('id', __WEBPACK_IMPORTED_MODULE_1__playlist_controller__["a" /* default */].findByParam);

playlistRouter.route('/').get(__WEBPACK_IMPORTED_MODULE_1__playlist_controller__["a" /* default */].getAll).post(__WEBPACK_IMPORTED_MODULE_1__playlist_controller__["a" /* default */].createOne);

playlistRouter.route('/:id').get(__WEBPACK_IMPORTED_MODULE_1__playlist_controller__["a" /* default */].getOne).put(__WEBPACK_IMPORTED_MODULE_1__playlist_controller__["a" /* default */].updateOne).delete(__WEBPACK_IMPORTED_MODULE_1__playlist_controller__["a" /* default */].createOne);

/***/ }),

/***/ "./src/api/resources/song/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__song_restRouter__ = __webpack_require__("./src/api/resources/song/song.restRouter.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__song_restRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__song_graphQLRouter__ = __webpack_require__("./src/api/resources/song/song.graphQLRouter.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__song_graphQLRouter__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__song_graphQLRouter__["b"]; });



/***/ }),

/***/ "./src/api/resources/song/song.controller.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_query__ = __webpack_require__("./src/api/modules/query.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__song_model__ = __webpack_require__("./src/api/resources/song/song.model.js");



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__modules_query__["a" /* generateControllers */])(__WEBPACK_IMPORTED_MODULE_1__song_model__["a" /* Song */]));

/***/ }),

/***/ "./src/api/resources/song/song.graphQLRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__song_graphql__ = __webpack_require__("./src/api/resources/song/song.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__song_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__song_graphql__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__song_graphql__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__song_resolvers__ = __webpack_require__("./src/api/resources/song/song.resolvers.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__song_resolvers__["a"]; });





/***/ }),

/***/ "./src/api/resources/song/song.graphql":
/***/ (function(module, exports) {

module.exports = "type Song {\n\tid: ID\n\ttitle: String!\n\turl: String!\n\talbum: String\n\tartist: String\n\trating: Int!\n\tfavorite: Boolean!\n}\n\ninput UpdatedSong {\n\tid: ID!\n\ttitle: String\n\turl: String\n\talbum: String\n\tartist: String\n\trating: Int\n\tfavorite: Boolean\n}\n\ninput NewSong {\n\ttitle: String\n\turl: String\n\talbum: String\n\tartist: String\n\trating: Int\n\tfavorite: Boolean\n}\n\nextend type Query {\n\tallSongs: [Song]!\n\tSong(id: ID!): Song!\n}\n\nextend type Mutation {\n\tupdateSong(input: UpdatedSong!): Song!\n\tnewSong(input: NewSong!): Song!\n}\n"

/***/ }),

/***/ "./src/api/resources/song/song.model.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Song; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var songSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
	title: {
		type: String,
		required: [true, 'Song must have a title']
	},

	url: {
		type: String,
		unique: true,
		required: [true, 'Song must have a url']
	},

	album: String,

	artist: String,

	rating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},

	favorite: {
		type: Boolean,
		required: true,
		default: false
	}
});

var Song = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('song', songSchema);

/***/ }),

/***/ "./src/api/resources/song/song.resolvers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return songResolvers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__("babel-runtime/helpers/objectWithoutProperties");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__song_model__ = __webpack_require__("./src/api/resources/song/song.model.js");



var getSong = function getSong(_, _ref, _ref2) {
	var id = _ref.id;
	var user = _ref2.user;

	return __WEBPACK_IMPORTED_MODULE_1__song_model__["a" /* Song */].findById(id).exec();
};

var updateSong = function updateSong(_, _ref3) {
	var input = _ref3.input;

	var id = input.id,
	    update = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(input, ['id']);

	return __WEBPACK_IMPORTED_MODULE_1__song_model__["a" /* Song */].findByIdAndUpdate(id, update, {
		new: tue
	}).exec();
};

var newSong = function newSong(_, _ref4) {
	var input = _ref4.input;

	return __WEBPACK_IMPORTED_MODULE_1__song_model__["a" /* Song */].create(input);
};

var allSongs = function allSongs() {
	return __WEBPACK_IMPORTED_MODULE_1__song_model__["a" /* Song */].find({}).exec();
};

var songResolvers = {
	Query: {
		allSongs: allSongs,
		Song: getSong
	},
	Mutation: {
		updateSong: updateSong,
		newSong: newSong
	}
};

/***/ }),

/***/ "./src/api/resources/song/song.restRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return songRouter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__song_controller__ = __webpack_require__("./src/api/resources/song/song.controller.js");



var songRouter = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

songRouter.param('id', __WEBPACK_IMPORTED_MODULE_1__song_controller__["a" /* default */].findByParam);

songRouter.route('/').get(__WEBPACK_IMPORTED_MODULE_1__song_controller__["a" /* default */].getAll).post(__WEBPACK_IMPORTED_MODULE_1__song_controller__["a" /* default */].createOne);

songRouter.route('/:id').get(__WEBPACK_IMPORTED_MODULE_1__song_controller__["a" /* default */].getOne).put(__WEBPACK_IMPORTED_MODULE_1__song_controller__["a" /* default */].updateOne).delete(__WEBPACK_IMPORTED_MODULE_1__song_controller__["a" /* default */].createOne);

/***/ }),

/***/ "./src/api/resources/user/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_restRouter__ = __webpack_require__("./src/api/resources/user/user.restRouter.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__user_restRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_graphQLRouter__ = __webpack_require__("./src/api/resources/user/user.graphQLRouter.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__user_graphQLRouter__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__user_graphQLRouter__["b"]; });



/***/ }),

/***/ "./src/api/resources/user/user.controller.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_query__ = __webpack_require__("./src/api/modules/query.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_model__ = __webpack_require__("./src/api/resources/user/user.model.js");



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__modules_query__["a" /* generateControllers */])(__WEBPACK_IMPORTED_MODULE_1__user_model__["a" /* User */]));

/***/ }),

/***/ "./src/api/resources/user/user.graphQLRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_graphql__ = __webpack_require__("./src/api/resources/user/user.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__user_graphql__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__user_graphql__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_resolvers__ = __webpack_require__("./src/api/resources/user/user.resolvers.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__user_resolvers__["a"]; });





/***/ }),

/***/ "./src/api/resources/user/user.graphql":
/***/ (function(module, exports) {

module.exports = "type User {\n\tusername: String!\n\tcreatedAt: String!\n\tupdatedAt: String!\n}\n\ninput UpdatedUser {\n\tusername: String!\n}\n\ntype Query {\n\tgetMe: User!\n}\n\ntype Mutation {\n\tupdateMe(input: UpdatedUser!): User!\n}\n"

/***/ }),

/***/ "./src/api/resources/user/user.model.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var userSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	passwordHash: {
		required: true,
		type: String
	}
}, { timestamps: true });

userSchema.methods = {
	authenticate: function authenticate(plaintTextPassword) {
		return bcrypt.compareSync(plainTextPword, this.password);
	},
	hashPassword: function hashPassword(plaintTextPassword) {
		if (!plaintTextPassword) {
			throw new Error('Could not save user');
		}

		var salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(plaintTextPassword, salt);
	}
};

var User = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('user', userSchema);

/***/ }),

/***/ "./src/api/resources/user/user.resolvers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userResolvers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_model__ = __webpack_require__("./src/api/resources/user/user.model.js");


var getMe = function getMe(_, __, _ref) {
	var user = _ref.user;

	return user;
};

var updateMe = function updateMe(_, _ref2) {
	var input = _ref2.input;
};

var userResolvers = {
	Query: {
		getMe: getMe
	},
	Mutation: {
		updateMe: updateMe
	}
};

/***/ }),

/***/ "./src/api/resources/user/user.restRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userRouter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_controller__ = __webpack_require__("./src/api/resources/user/user.controller.js");



var userRouter = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

userRouter.param('id', __WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].findByParam);

userRouter.route('/').get(__WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].getAll).post(__WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].createOne);

userRouter.route('/:id').get(__WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].getOne).put(__WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].updateOne).delete(__WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].createOne);

/***/ }),

/***/ "./src/api/restRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return restRouter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources_user__ = __webpack_require__("./src/api/resources/user/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resources_song__ = __webpack_require__("./src/api/resources/song/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resources_playlist__ = __webpack_require__("./src/api/resources/playlist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_errorHandler__ = __webpack_require__("./src/api/modules/errorHandler.js");






var restRouter = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

restRouter.use('/user', __WEBPACK_IMPORTED_MODULE_1__resources_user__["b" /* userRouter */]);
restRouter.use('/song', __WEBPACK_IMPORTED_MODULE_2__resources_song__["b" /* songRouter */]);
restRouter.use('/playlist', __WEBPACK_IMPORTED_MODULE_3__resources_playlist__["b" /* playlistRouter */]);
restRouter.use(__WEBPACK_IMPORTED_MODULE_4__modules_errorHandler__["a" /* apiErrorHandler */]);

/***/ }),

/***/ "./src/config/dev.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
var config = {
	expireTime: '30d',
	secrets: {
		JWT_SECRET: 'yeezy350boost'
	}
};

/***/ }),

/***/ "./src/config/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__("lodash.merge");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_merge__);


Object({"BUILD_TARGET":"server"}).NODE_ENV = Object({"BUILD_TARGET":"server"}).NODE_ENV || 'development';

var env = Object({"BUILD_TARGET":"server"}).NODE_ENV;

var baseConfig = {
	port: 3000,
	secrets: {},
	db: {
		url: 'mongodb://localhost/jams'
	}
};

var envConfig = {};

switch (env) {
	case 'development':
	case 'dev':
		envConfig = __webpack_require__("./src/config/dev.js").config;
		break;
	case 'test':
	case 'testing':
		envConfig = __webpack_require__("./src/config/testing.js").config;
		break;
	case 'prod':
	case 'production':
		envConfig = __webpack_require__("./src/config/prod.js").config;
	default:
		envConfig = __webpack_require__("./src/config/dev.js").config;
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default()(baseConfig, envConfig));

/***/ }),

/***/ "./src/config/prod.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
var config = {};

/***/ }),

/***/ "./src/config/testing.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
var config = {
	expireTime: '30d',
	secrets: {
		JWT_SECRET: 'yeezy350boost'
	},
	db: {
		url: 'mongodb://localhost/jams-test'
	}
};

/***/ }),

/***/ "./src/db.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return connect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__("./src/config/index.js");


__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Promise = global.Promise;

var connect = function connect() {
	var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */];

	return __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect(config.db.url, {
		useMongoClient: true
	});
};

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http__ = __webpack_require__("http");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__("./src/server.js");

// import { execute, subscribe } from 'graphql'



// import schema from './schema'

var server = __WEBPACK_IMPORTED_MODULE_0_http___default.a.createServer(__WEBPACK_IMPORTED_MODULE_1__server__["default"]);
var currentApp = __WEBPACK_IMPORTED_MODULE_1__server__["default"];

server.listen(3000, function () {
	console.log('Server listening on port 3000');
});

if (true) {
	module.hot.accept(["./src/server.js"], function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__("./src/server.js"); (function () {
		server.removeListener('request', currentApp);
		server.on('request', __WEBPACK_IMPORTED_MODULE_1__server__["default"]);
		currentApp = __WEBPACK_IMPORTED_MODULE_1__server__["default"];
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ }),

/***/ "./src/middleware.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser__ = __webpack_require__("body-parser");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_body_parser__);


var setGlobalMiddleware = function setGlobalMiddleware(app) {
	app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.urlencoded({ extended: true }));
	app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.json());
};

/* harmony default export */ __webpack_exports__["a"] = (setGlobalMiddleware);

/***/ }),

/***/ "./src/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__middleware__ = __webpack_require__("./src/middleware.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__("./src/api/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db__ = __webpack_require__("./src/db.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_modules_auth__ = __webpack_require__("./src/api/modules/auth.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_apollo_server_express__ = __webpack_require__("apollo-server-express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_apollo_server_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_apollo_server_express__);






// Declare an app from express
var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

Object(__WEBPACK_IMPORTED_MODULE_1__middleware__["a" /* default */])(app);
Object(__WEBPACK_IMPORTED_MODULE_3__db__["a" /* connect */])();
// setup basic routing for index route

app.use('/signin', __WEBPACK_IMPORTED_MODULE_4__api_modules_auth__["b" /* signin */]);
app.use('/api', __WEBPACK_IMPORTED_MODULE_4__api_modules_auth__["a" /* protect */], __WEBPACK_IMPORTED_MODULE_2__api__["b" /* restRouter */]);
app.use('/graphql', __WEBPACK_IMPORTED_MODULE_2__api__["a" /* graphQLRouter */]);
app.use('/docs', Object(__WEBPACK_IMPORTED_MODULE_5_apollo_server_express__["graphiqlExpress"])({ endpointURL: '/graphql' }));
// catch all
app.all('*', function (req, res) {
	res.json({ ok: true });
});

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/webpack/hot/poll.js?1000");
module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "apollo-server-express":
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "babel-runtime/core-js/promise":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "babel-runtime/helpers/extends":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),

/***/ "babel-runtime/helpers/objectWithoutProperties":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ }),

/***/ "babel-runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),

/***/ "graphql-tools":
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "http":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jsonwebtoken":
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash.merge":
/***/ (function(module, exports) {

module.exports = require("lodash.merge");

/***/ }),

/***/ "mongoose":
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map