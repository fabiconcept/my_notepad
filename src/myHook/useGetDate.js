export const useGetDate = () =>{
    const dateNow = new Date();
    let timeH = dateNow.getHours();
    let timeM = dateNow.getMinutes();

    let time = `${timeH}: ${timeM}`;

    let month = dateNow.toLocaleString('default', { month: 'short' });
    let year = dateNow.getFullYear();
    let dayNum = dateNow.getDate();

    const fullDate = `${time} ${timeH > 12 ? "PM" : "AM"}, ${month} ${dayNum}, ${year}`;

    return fullDate;
}