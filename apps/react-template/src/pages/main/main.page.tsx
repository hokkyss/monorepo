import { Languages, i18n, useTranslation } from '../../configs/locale/locale.config';
import routeMap from '../../configs/route/route-map.config';

import useTodos from './hooks/use-todos.hook';
import enTranslation from './translations/en.translation.json';
import idTranslation from './translations/id.translation.json';
import jaTranslation from './translations/ja.translation.json';

i18n.init(() => {
  i18n
    .addResourceBundle(Languages.EN, routeMap.main, enTranslation)
    .addResourceBundle(Languages.ID, routeMap.main, idTranslation)
    .addResourceBundle(Languages.JA, routeMap.main, jaTranslation);
});

export default function MainPage() {
  const todos = useTodos();
  const [, setLang] = useTranslation(routeMap.main);

  return (
    <div>
      {Object.entries(Languages).map(([key, lang]) => (
        <button key={key} onClick={() => setLang(lang)}>
          Change Language to: {lang}
        </button>
      ))}
      {todos.data && (
        <ol data-testid="main:todo-list">
          {todos.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
