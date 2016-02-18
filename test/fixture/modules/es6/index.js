export default class MyClass {
  constructor () {
    console.log('initialize fresh instance!')
  }
  foo () {
    console.log(`i am an instance of ${this.constructor.name}`)
  }
}
