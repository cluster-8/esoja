import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { QuotationScreenRouteProps } from '../../data/routes/app';
import { Quotation, useHome } from '../../hooks/useHome';
import { BagQuotation } from './BagQuotation';
import { SeedQuotation } from './SeedQuotation';

export const QuotationPage: React.FC<QuotationScreenRouteProps> = ({
  route
}) => {
  const [page, setPage] = useState(route.params.selectedPage);
  const [bagQuotation, setBagQuotation] = useState<Quotation[]>([]);
  const [seedQuotation, setSeedQuotation] = useState<Quotation[]>([]);

  const { getHistoryQuotation } = useHome();

  useEffect(() => {
    const getData = async () => {
      try {
        const quotations = await getHistoryQuotation();
        const seeds = quotations.map(
          ({ conventionalSeed }) => conventionalSeed
        );
        setSeedQuotation(
          seeds.sort((seedA, seedB) => {
            if (seedA.DataPublicacao) {
              return -1;
            }
            if (seedB.DataPublicacao) {
              return 1;
            }
            return 0;
          })
        );
        const bags = quotations.map(
          ({ availableSoybeanPack }) => availableSoybeanPack
        );
        setBagQuotation(
          bags.sort((seedA, seedB) => {
            if (seedA.DataPublicacao) {
              return -1;
            }
            if (seedB.DataPublicacao) {
              return 1;
            }
            return 0;
          })
        );
      } catch (err) {
        Alert.alert('Não foi possivel atualizar os dados ');
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
