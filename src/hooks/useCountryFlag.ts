import { useEffect, useState } from 'react';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { RootState } from '@/context/store';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function useCountryFlag() {
  const country = useSelector((state: RootState) => state.location.country);
  
  const [countryCode, setCountryCode] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [showError, setShowError] = useState(false);
  const [deviceLocale, setDeviceLocale] = useState('US');
  const [phoneUtil, setPhoneUtil] = useState<PhoneNumberUtil | null>(null);

  useEffect(() => {
    const locale = country ?? 'US';
    Cookies.set('countryCode', locale);
    setDeviceLocale(locale);

    const util = PhoneNumberUtil.getInstance();
    setPhoneUtil(util);
  }, [country]);

  const handleInputShowFlag = async (value: string) => {
    if (!phoneUtil) return;

    let sanitizedValue = value.replace(/\s+/g, '').replace(/[^+\d]/g, '');

    if (sanitizedValue.length <= 1 || /[^\d+]/g.test(value)) {
      setShowFlag(false);
      setShowError(false);
      return;
    }

    if (sanitizedValue.startsWith('00')) {
      sanitizedValue = '+' + sanitizedValue.substring(2);
    }

    try {
      const number = phoneUtil.parse(sanitizedValue, countryCode);
      const regionCode = phoneUtil.getRegionCodeForNumber(number) || deviceLocale;
      setCountryCode(regionCode);
      setShowFlag(true);

      if (phoneUtil.isValidNumber(number)) {
        setShowError(false);
      } else {
        setShowError(true);
      }
    } catch (error) {
      setCountryCode(deviceLocale);
      setShowFlag(true);
      setShowError(true);
    }
  };

  const handleCheckEmailOrPhone = async (value: string) => {
    if (!phoneUtil) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[A-Za-z](?:[A-Za-z0-9_]+)*$/;
    const userData = value.trim().toLowerCase();

    if (emailRegex.test(userData) || usernameRegex.test(userData)) {
      return userData;
    }

    let sanitizedValue = userData.replace(/\s+/g, '').replace(/[^+\d]/g, '');

    if (sanitizedValue.startsWith('00')) {
      sanitizedValue = '+' + sanitizedValue.substring(2);
    }

    try {
      const number = phoneUtil.parse(sanitizedValue, deviceLocale);
      return phoneUtil.format(number, PhoneNumberFormat.E164);
    } catch (error) {
      return null;
    }
  };

  return { countryCode, showFlag, showError, handleInputShowFlag, handleCheckEmailOrPhone };
}
