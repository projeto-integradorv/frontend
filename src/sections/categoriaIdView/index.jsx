import BasicLayout from '../../layouts/basic/basiclayout';  
import CardapioContainer from '../../components/cardapioContainer';
import { carregarCategoria } from '@/lib/features/categoria/categoriaSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/lib/hooks';

export default function CategoryIdView({ Id }) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(carregarCategoria(Id));
    }, [dispatch, Id]);

    const categoria = useAppSelector((state) => state.categorias.categoria);

    return (
        <BasicLayout titulo={categoria.name || 'Categoria'}>
            <CardapioContainer Id={Id} />
        </BasicLayout>
    );
}
