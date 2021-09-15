class Store {
  constructor() {
    this.store = localStorage
  }
  addStorage = (key, value) => {
    this.store.setItem(key, value)
    return this.store.getItem(key)
  }
  readStorage = (key) => {
    if (key === undefined){
      return this.store
    }else{
      return this.store.getItem(key)
    }
  }
  removeStorage = (key) =>{
    this.store.removeItem(key)
    return true
  }

}

export default new Store()