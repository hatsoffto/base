export const useButton = () => {
  return {
    variantMapping: {
      green: 'text-white bg-green-500 disabled:bg-green-300 hover:bg-green-600 focus:ring-green-400',
      light: 'text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-400 focus:ring-gray-200 border-gray-150 disabled:text-gray-300 disabled:bg-gray-100 disabled:hover:bg-gray-100 hover:text-gray-300',
      red: 'text-white bg-red-500 hover:bg-red-700 focus:ring-red-500 border-red-600',
      yellow: 'text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 border-yellow-700',
      blue: 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 border-blue-600',
      primary: 'text-white bg-primary-500 hover:bg-primary-600 border-primary-400 focus:ring-primary-400',
      secondary: 'text-white bg-secondary-500 hover:bg-secondary-600 border-secondary-400 focus:ring-primary-400',
      dark: 'text-white bg-gray-900 hover:bg-gray-800 focus:ring-gray-900 focus:ring-gray-800 dark:border dark:border-gray-600',
      white: 'text-gray-700 bg-white hover:bg-gray-50 border focus:ring-gray-200',
      outline: 'text-gray-700 hover:bg-gray-50 border focus:ring-gray-200 dark:text-gray-200 dark:hover:bg-gray-800',
      auto: 'text-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 border dark:border-gray-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-600 dark:text-gray-200 dark:hover:bg-gray-800',
      brand: 'text-white bg-brand-500 hover:bg-brand-400 focus:ring-brand-500 border-brand-600 focus:ring-brand-400',
    },

    sizeMapping: {
      sm: 'px-4 py-2.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-base'
    },

    baseClass: 'inline-flex items-center font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap'
  }
}