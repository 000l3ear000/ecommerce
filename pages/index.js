import Head from 'next/head'
import Cara from '../components/Cara'
import CategoriesUI from '../components/categories/categoriesUI'
import Items from '../components/Items/Items'
import SearchBar from '../components/Search'
import styles from '../styles/Home.module.css'

// import dbConnection from '../helpers/dbConnection';
// import Rating from '../models/Rating'
// dbConnection();

export default function Home() {
  

  // if(typeof window !== 'undefined')
  // localStorage.clear()
  const arr=[1,2,3,4,5,6,7,8]
  
  return (
    
    <div className={styles.mainItem}>
      <div className={styles.main}>
        <Head>
        <title>Home</title>
        </Head>
        <Cara/>
        <Items/>
        <CategoriesUI/>
      </div>
    </div>
    
    )
  }
  
  
  // const ab = new Category({
  //   name: 'soap'
  // }).save()
  // const ba = new Category({
  //   name: 'shampoo'
  // }).save()
  
  // const aaProduct = new Product({
  // name: 'bio amla',
  // price: 567,
  // description: "A body product",
  // q: 'piece',
  // category: 'soap',
  // manufacturer: 'Bhola Record',
  // quantity: 56,
  // sku: '444444_123123_12321'
  // }).save()

  // const aProduct = new Product({
  // name: 'lifebuoy',
  // category: 'soap',
  // manufacturer: 'Bhola Record',
  // quantity: 561,
  // price: 5617,
  // description: "A body product",
  // q: 'piece',
  // sku: '444444_123123_12321'
  // }).save()

  // const aaProdgguct = new Product({
  // name: 'safeguard',
  // category: 'soap',
  // manufacturer: 'Bhola Record',
  // quantity: 56,
  // price: 567,
  // description: "A body product",
  // q: 'piece',
  // sku: '49867664_123123_12321'
  // }).save()

  // const aappduct = new Product({
  // name: 'bio amla',
  // category: 'soap',
  // manufacturer: 'Bhola Record',
  // quantity: 56,
  // price: 567,
  // description: "A body product",
  // q: 'piece',
  // sku: '444444_123123_12321'
  // }).save()

  // const at = new Product({
  // name: 'Tibet',
  // category: 'soap',
  // manufacturer: 'Bhola Record',
  // quantity: 56,
  // price: 999,
  // description: "A body product",
  // q: 'piece',
  // sku: '123333_123123_12321'
  // }).save()

  // const aaPrdasoduct = new Product({
  // name: 'clear for men',
  // category: 'shampoo',
  // manufacturer: 'Bhola Record',
  // quantity: 56,
  // price: 522,
  // description: "A body product",
  // q: 'piece',
  // sku: '42244_123123_12321'
  // }).save()

  // const a = new Rating({
  // productId: '61218779fbd1e83f1cb1ed2e',
  // comments: ["pro", "asdasd"],
  // rating: 4.5,
  // purchased: 3,
  // }).save()

  // const b = new Rating({
  // productId: '61218779fbd1e83f1cb1ed2f',
  // comments: ["asdasdd", "asdasdasddasd"],
  // rating: 3.5,
  // purchased: 5,
  // }).save()

  // const v = new Rating({
  // productId: '61218779fbd1e83f1cb1ed30',
  // comments: ["pddddro", "asdadddddsd"],
  // rating: 1.5,
  // purchased: 43,
  // }).save()

  // const c = new Rating({
  // productId: '61218779fbd1e83f1cb1ed31',
  // comments: ["praaaaaao", "adddddsdasd"],
  // rating: 2.5,
  // purchased: 13,
  // }).save()

  // const d = new Rating({
  // productId: '61218779fbd1e83f1cb1ed32',
  // comments: ["protttttt", "attttsdasd"],
  // rating: 4.2,
  // purchased: 42,
  // }).save()

  // const e = new Rating({
  // productId: '61218779fbd1e83f1cb1ed34',
  // comments: ["prbbbbxasdxo", "asdazasdzzzzzzsd"],
  // rating: 4.1,
  // }).save()
  