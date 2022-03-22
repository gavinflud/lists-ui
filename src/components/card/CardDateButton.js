import moment from 'moment';
import './CardDateButton.scss';

const useCardDateButton = (date) => {

  const getValueIfDateIsNotNull = (calculation) => {
    if (date != null) {
      return calculation();
    }

    return null;
  };

  const convertToDisplayableDate = () => {
    return getValueIfDateIsNotNull(() => moment(date)
        .format('D MMM YYYY'));
  };

  const getButtonClass = () => {
    return getValueIfDateIsNotNull(() => {
      let baseClass = 'gf-card-due-date-button';
      const today = moment();
      const targetDate = moment(date);
      let millisecondsToTargetFromToday = targetDate.diff(today);
      let daysToDateFromToday = targetDate.diff(today, 'days');

      if (millisecondsToTargetFromToday < 0) {
        return baseClass + ' gf-card-due-date-button-overdue';
      } else if (daysToDateFromToday <= 1) {
        return baseClass + ' gf-card-due-date-button-today';
      }

      return baseClass;
    });
  };

  const getIconClass = () => {
    return 'fa-regular fa-clock';
  };

  return {
    displayableDate: convertToDisplayableDate(date),
    buttonClass: getButtonClass(),
    iconClass: getIconClass(),
  };
};

export const CardDateButton = ({date}) => {

  const {displayableDate, buttonClass, iconClass} = useCardDateButton(date);

  if (date == null) {
    return '';
  }

  return (
      <button className={buttonClass}>
        <i className={iconClass}/>
        {displayableDate}
      </button>
  );

};