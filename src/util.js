const toString = Object.prototype.toString

export const delay = function(fn, ms) {
  return setTimeout(fn, ms || 0)
}

export const isArray = function(value) {
  return Array.isArray ? Array.isArray(value) : toString.call(value) === '[object Array]'
}
export const isObject = function(value) {
  return toString.call(value) === '[object Object]'
}
export const isBool = function(value) {
  return toString.call(value) === '[object Boolean]'
}
export const isString = function(value) {
  return toString.call(value) === '[object String]'
}

function _cvFilterToV1(filter) {
  let nf = {key: filter.field || filter.key}

  if (!filter.query) {
    filter.query = {}
  }

  if (filter.key == 'created_by') {
    nf.values = filter.query.in
  } else if (filter.key == 'create_on') {
    nf.values = {...filter.query}
  } else {
    if (isArray(filter.query.in)) {
      if (isString(filter.query.in[0]) && filter.query.in[0] != 'myself') {
        nf.keywords = filter.query.in
      } else {
        nf.values = filter.query.in
      }
    } else {
      nf.values = {...filter.query}
    }
    if (isBool(filter.query.em)) {
      nf.is_set = !filter.query.em
    }
    if (filter.query.in_field) {
      nf.fields = filter.query.in_field
    }
    // todo 兼容within场景
    if (isArray(filter.query.inc)) {
      nf.values = filter.query.inc
    }
  }

  return nf
}
function _cvFilterToV2(filter) {
  let nf = {field: filter.key, query: {}}

  if (filter.key == 'created_by') {
    nf.query.in = filter.values
  } else if (filter.key == 'create_on') {
    nf.query = {...filter.values}
  } else {
    if (isObject(filter.values)) {
      nf.query = {...filter.values}
    } else if (isArray(filter.values)) {
      nf.query.in = filter.values
    }
    if (filter.keywords && isArray(filter.keywords) && filter.keywords.length) {
      nf.query.in = filter.keywords
    }
    if (filter.is_set === true || filter.is_set === false) {
      nf.query.em = !filter.is_set
    }
    if (filter.fields) {
      nf.query.in_field = filter.fields
    }
    // 权限设置用的是within，这里需要兼容
    if (isArray(filter.within)) {
      nf.query.inc = filter.within
    }
  }

  return nf
}

export const cvFiltersToV1 = function(filters) {
  let ops = Object.keys(filters)
  let newFilters = {}

  ops.forEach(op => {
    if (isObject(filters[op])) {
      newFilters[op] = cvFiltersToV1(filters[op])
    } else if (isArray(filters[op])) {
      newFilters[op] = filters[op].map(_cvFilterToV1)
    }
  })

  return newFilters
}

export const cvFiltersToV2 = function(filters) {
  let ops = Object.keys(filters)
  let newFilters = {}

  ops.forEach(op => {
    if (isObject(filters[op])) {
      newFilters[op] = cvFiltersToV2(filters[op])
    } else if (isArray(filters[op])) {
      newFilters[op] = filters[op].map(_cvFilterToV2)
    }
  })

  return newFilters
}
