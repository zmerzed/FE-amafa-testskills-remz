import dayjs from 'dayjs';

const config = useRuntimeConfig();

function defaultHours () {
    return {
        "monday": {
            "from": "01:00",
            "to": "23:00",
            "availability": true
        },
        "tuesday": {
            "from": "01:00",
            "to": "23:00",
            "availability": true
        },
        "wednesday": {
            "from": "01:00",
            "to": "23:00",
            "availability": true
        },
        "thursday": {
            "from": "01:00",
            "to": "23:00",
            "availability": true
        },
        "friday": {
            "from": "01:00",
            "to": "23:00",
            "availability": true
        },
        "saturday": {
            "from": "01:00",
            "to": "23:00",
            "availability": true
        },
        "sunday": {
            "from": "01:00",
            "to": "23:00",
            "availability": true
        }
    }
}

function minimizeHoursErrorMessage (errors: any)
{
    const businessHours = defaultHours()
    Object.keys(businessHours).forEach(key => {
        if (errors[`business_hours.${key}.from`]) {
            errors[`business_hours.${key}.from`] = errors[`business_hours.${key}.from`].replace(`The business_hours.${key}.from`, "")
        }

        if (errors[`business_hours.${key}.to`]) {
            errors[`business_hours.${key}.to`] = errors[`business_hours.${key}.to`].replace(`The business_hours.${key}.to`, "")
        }

        if (errors[`business_hours.${key}.availability`]) {
            errors[`business_hours.${key}.availability`] = errors[`business_hours.${key}.availability`].replace(`The business_hours.${key}.availability`, "")
        }
    });
    return errors;
}

function parseBusinessHours(businessHours: any)
{
    let tempBusinessHours = {}

    let now = dayjs()
    let nowFrom = dayjs(now.format('YYYY-MM-DD'))
    let nowTo = dayjs(now.format('YYYY-MM-DD'))

    businessHours.forEach((schedule: any) => {
        nowFrom = dayjs(now.format('YYYY-MM-DD') + ' ' + schedule.from)
        nowTo = dayjs(now.format('YYYY-MM-DD') + ' ' + schedule.to)
        tempBusinessHours[schedule.day] = {
            from: nowFrom.format('hh:mm'),
            to: nowTo.format('hh:mm'),
            availability: schedule.availability
        }
    })
    return tempBusinessHours
}

export {
    defaultHours,
    minimizeHoursErrorMessage,
    parseBusinessHours
};
