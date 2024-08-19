import BasicLayout from '../../layouts/basic/basiclayout';  
import CadarpioContainer from '@/components/cadarpioContainer';

export default function CategoryIdView({Id}) {

    return(
        <BasicLayout titulo = 'Categoria'>
            < CadarpioContainer Id={Id} />
        </BasicLayout>
    )
}