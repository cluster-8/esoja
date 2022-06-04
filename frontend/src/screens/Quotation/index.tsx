import React, { useEffect, useState } from 'react';
import { QuotationScreenRouteProps } from '../../data/routes/app';
import { getQuotation } from '../../data/services/quotation.service';
import { Quotation } from '../../hooks/useHome';
import { BagQuotation } from './BagQuotation';
import { SeedQuotation } from './SeedQuotation';

export const QuotationPage: React.FC<QuotationScreenRouteProps> = ({
  route
}) => {
  const [page, setPage] = useState(route.params.selectedPage);
  const [bagQuotation, setBagQuotation] = useState<Quotation[]>([]);
  const [seedQuotation, setSeedQuotation] = useState<Quotation[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const quotations = await getQuotation();
        setSeedQuotation(
          quotations.map(({ conventionalSeed }) => conventionalSeed)
        );
        setBagQuotation(
          quotations.map(({ availableSoybeanPack }) => availableSoybeanPack)
        );
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  if (page === 'BagQuotation') {
    return (
      <BagQuotation
        bagQuotation={bagQuotation}
        navigate={() => setPage('SeedQuotation')}
      />
    );
  }
  return (
    <SeedQuotation
      seedQuotation={seedQuotation}
      navigate={() => setPage('BagQuotation')}
    />
  );
};
