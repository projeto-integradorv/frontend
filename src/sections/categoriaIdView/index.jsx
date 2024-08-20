import BasicLayout from '../../layouts/basic/basiclayout';  
import CadarpioContainer from '../../components/cardapioContainer';

export default function CategoryIdView({Id}) {

    return(
        <BasicLayout titulo = 'Categoria'>
            < CadarpioContainer Id={Id} />
        </BasicLayout>
    )
}