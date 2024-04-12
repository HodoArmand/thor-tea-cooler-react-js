import { useEffect } from 'react';

export default function useTitle(title_) {
  useEffect(() => {
    document.title = title_;
  }, []);
}