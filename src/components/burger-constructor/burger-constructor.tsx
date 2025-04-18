import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearOrder, createOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { order, isLoading } = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const constructorItems = { bun, ingredients };

  const orderRequest = isLoading;

  const orderModalData = order;

  const onOrderClick = () => {
    if (!user.user) {
      console.log('Пользователь не авторизован');
      navigate('/login');
      return;
    }

    if (!bun || orderRequest) {
      console.log('Заказ не может быть оформлен');
      return;
    }

    const ingredientIds = [bun._id, ...ingredients.map((i) => i._id), bun._id];
    console.log('Заказ оформляется...');
    dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
