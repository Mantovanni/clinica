
export default {
    module : module,
    modal : modal,
    crud : crud,
    render : render,
    form : form,
    table : table,
    bug : bug,
    auth : auth,
    modal : modal,
    autoComplete : autoComplete,
    ico : ico,
    firstToUpperCase : firstToUpperCase,
    fetchPost : fetchPost,
    fetchText : fetchText,
    lerHash : lerHash,
    inserirHash : inserirHash,
    clearIntervalCustom : clearIntervalCustom,
    setIntervalCustom : setIntervalCustom,
    paraMoeda : paraMoeda,
    paraMoedaReal : paraMoedaReal,
    paraFloat : paraFloat,
    findElArrayInObject : findElArrayInObject,
    formatDataISOforDataUser : formatDataISOforDataUser,
    formatDataUserforISO : formatDataUserforISO,
    getDataAtualFormatada : getDataAtualFormatada,
    getDataAtualISO : getDataAtualISO,
    maskMoeda : maskMoeda,
    maskQuantidade : maskQuantidade,
    allFirstToUpperCase : allFirstToUpperCase,
    appendMultipleNodes : appendMultipleNodes,
    findNamePropInObeject : findNamePropInObeject,
    htmlToElement : htmlToElement,
    findNamePropInObeject : findNamePropInObeject,
    selectValue : selectValue,
    findNamePropInObeject : findNamePropInObeject,
    findNamePropInObeject : findNamePropInObeject,
    findNamePropInObeject : findNamePropInObeject,
    objectValue : objectValue,
    selectAdd : selectAdd,
    
   



};


import {firstToUpperCase, fetchPost, fetchText, lerHash, inserirHash, formatDataISOforDataUser, maskQuantidade,
    clearIntervalCustom, paraMoeda, paraMoedaReal, paraFloat, setIntervalCustom, findElArrayInObject, maskMoeda,
    allFirstToUpperCase, appendMultipleNodes,findNamePropInObeject,getDataAtualFormatada,getDataAtualISO ,formatDataUserforISO,
    htmlToElement, selectValue, objectValue, selectAdd} 
    from './modulo/modulos.js';




//===========================================================================================

//Biblioteca com funções gerais
import * as module from './modulo/modulos.js';


import * as modal from './modulo/modal.js';

import * as crud from './modulo/crud.js';

import * as render from './modulo/render.js';

import * as form from './modulo/form.js';

import * as table from './modulo/table.js';

import * as bug from './modulo/bug.js';

import * as auth from './modulo/auth.js';


//SubModulos================================================================================
import * as autoComplete from './modulo/submodulo/autocomplete/autoComplete.js';

import * as ico from './modulo/submodulo/ico.js';

// export * as apex from './modulo/submodulo/apex/apexcharts.js';
import './modulo/submodulo/apex/apexcharts.js';




//SUbmodulos --------------------------------
// export  * as autoComplete from './modulo/submodulo/autocomplete/autoComplete.js';
// export { default as autoComplete } from "./modulo/submodulo/autocomplete/autoComplete.js";