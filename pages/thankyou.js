import { useStoreActions } from "easy-peasy";
import { useRouter } from 'next/router'

function thankyou () {
    
    const router = useRouter();
    setTimeout(() => {
        router.push('/myOrders');
    }, 3000);

    return (
        <div style={{height:'100vh',overflow:'auto'}}>
            <h1>Thankyou for your patience with our site!</h1>
        </div>
    )
}

export default thankyou;