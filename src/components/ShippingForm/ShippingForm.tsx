import './ShippingForm.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { shippingSchema, ShippingFormValues } from '../../schema/shipping.schema';
import { FC } from 'react';

type Props = {
  onBack?: () => void;
  onNext?: (data: ShippingFormValues) => void;
};

const ShippingForm: FC<Props> = ({ onBack, onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const submit = (values: ShippingFormValues) => {
    if (onNext) onNext(values);
    else console.log('Shipping Form Submitted', values);
  };

  return (
    <div className='shipping-form-container'>
      <h2 className='shipping-form__title'>Shipping Address</h2>
      <form className='shipping-form' onSubmit={handleSubmit(submit)} noValidate>
        <div className='shipping-form__row'>
          <div className='shipping-form__group'>
            <label htmlFor='firstName' className='shipping-form__label'>
              First Name
            </label>
            <input {...register('firstName')} className='shipping-form__input' id='firstName' placeholder='John' />
            {errors.firstName && <div className='shipping-form__error'>{errors.firstName.message}</div>}
          </div>
          <div className='shipping-form__group'>
            <label htmlFor='lastName' className='shipping-form__label'>
              Last Name
            </label>
            <input {...register('lastName')} className='shipping-form__input' id='lastName' placeholder='Doe' />
            {errors.lastName && <div className='shipping-form__error'>{errors.lastName.message}</div>}
          </div>
        </div>

        <div className='shipping-form__row'>
          <div className='shipping-form__group'>
            <label htmlFor='email' className='shipping-form__label'>
              Email
            </label>
            <input {...register('email')} className='shipping-form__input' id='email' placeholder='john@example.com' />
            {errors.email && <div className='shipping-form__error'>{errors.email.message}</div>}
          </div>
          <div className='shipping-form__group'>
            <label htmlFor='phone' className='shipping-form__label'>
              Phone Number
            </label>
            <input {...register('phone')} className='shipping-form__input' id='phone' placeholder='+1 (555) 123-4567' />
            {errors.phone && <div className='shipping-form__error'>{errors.phone.message}</div>}
          </div>
        </div>

        <div className='shipping-form__group'>
          <label htmlFor='address' className='shipping-form__label'>
            Street Address
          </label>
          <input {...register('address')} className='shipping-form__input' id='address' placeholder='123 Main Street' />
          {errors.address && <div className='shipping-form__error'>{errors.address.message}</div>}
        </div>

        <div className='shipping-form__row'>
          <div className='shipping-form__group'>
            <label htmlFor='city' className='shipping-form__label'>
              City
            </label>
            <input {...register('city')} className='shipping-form__input' id='city' placeholder='New York' />
            {errors.city && <div className='shipping-form__error'>{errors.city.message}</div>}
          </div>
          <div className='shipping-form__group'>
            <label htmlFor='state' className='shipping-form__label'>
              State / Province
            </label>
            <input {...register('state')} className='shipping-form__input' id='state' placeholder='NY' />
            {errors.state && <div className='shipping-form__error'>{errors.state.message}</div>}
          </div>
        </div>

        <div className='shipping-form__row'>
          <div className='shipping-form__group'>
            <label htmlFor='zipCode' className='shipping-form__label'>
              ZIP / Postal Code
            </label>
            <input {...register('zipCode')} className='shipping-form__input' id='zipCode' placeholder='10001' />
            {errors.zipCode && <div className='shipping-form__error'>{errors.zipCode.message}</div>}
          </div>
          <div className='shipping-form__group'>
            <label htmlFor='country' className='shipping-form__label'>
              Country
            </label>
            <input {...register('country')} className='shipping-form__input' id='country' placeholder='United States' />
            {errors.country && <div className='shipping-form__error'>{errors.country.message}</div>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type='button' className='shipping-form__submit' onClick={onBack} style={{ background: 'transparent', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', padding: '10px 14px', borderRadius: 10 }}>
            Back
          </button>
          <button type='submit' className='shipping-form__submit' disabled={isSubmitting}>
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
