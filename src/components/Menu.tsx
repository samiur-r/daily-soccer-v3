import { Bars3Icon, XMarkIcon, ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'


const navigation = [
    { name: 'Competition 1', href: '#', icon: ArrowRightIcon, current: true },
    { name: 'Competition 2', href: '#', icon: ArrowRightIcon, current: false },
    { name: 'Competition 3', href: '#', icon: ArrowRightIcon, current: false },
    { name: 'Competition 4', href: '#', icon: ArrowRightIcon, current: false },
    { name: 'Competition 5', href: '#', icon: ArrowRightIcon, current: false },
    { name: 'Competition 6', href: '#', icon: ArrowRightIcon, current: false },
]
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const Menu = () => (

    <nav className="sticky top-24 space-y-1" aria-label="Sidebar">
        {navigation.map((item) => (
            <a
                key={item.name}
                href={item.href}
                className={classNames(
                    item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                )}
                aria-current={item.current ? 'page' : undefined}
            >
                <item.icon
                    className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                    )}
                    aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
            </a>
        ))}
    </nav>

)

export default Menu