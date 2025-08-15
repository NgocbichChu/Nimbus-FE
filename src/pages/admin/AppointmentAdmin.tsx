import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import BackToTopButton from '@/components/back-to-top/back-to-top';

interface WorkSchedule {
  lichlvId: number;
  ngay: string;
  caTruc: 'Sáng' | 'Chiều';
  lyDoNghi?: string;
  tenBacSi: string;
  idBacSi: number;
}

const mockDoctors = [
  { id: 1, name: 'Bác sĩ Nguyễn Văn A', specialty: 'Nội tổng quát' },
  { id: 2, name: 'Bác sĩ Trần Thị B', specialty: 'Nhi khoa' },
  { id: 3, name: 'Bác sĩ Lê Văn C', specialty: 'Da liễu' },
  { id: 4, name: 'Bác sĩ Phạm Thị D', specialty: 'Tim mạch' },
  { id: 5, name: 'Bác sĩ Hoàng Văn E', specialty: 'Ngoại khoa' },
];

const mockSchedules: WorkSchedule[] = [
  {
    lichlvId: 1,
    ngay: '2025-08-14',
    caTruc: 'Sáng',
    tenBacSi: 'Bác sĩ Nguyễn Văn A',
    idBacSi: 1,
  },
  {
    lichlvId: 2,
    ngay: '2025-08-14',
    caTruc: 'Chiều',
    tenBacSi: 'Bác sĩ Trần Thị B',
    idBacSi: 2,
  },
  {
    lichlvId: 3,
    ngay: '2025-08-13',
    caTruc: 'Sáng',
    tenBacSi: 'Bác sĩ Lê Văn C',
    idBacSi: 3,
    lyDoNghi: 'Nghỉ phép',
  },
  {
    lichlvId: 4,
    ngay: '2025-08-13',
    caTruc: 'Chiều',
    tenBacSi: 'Bác sĩ Phạm Thị D',
    idBacSi: 4,
  },
  {
    lichlvId: 5,
    ngay: '2025-08-12',
    caTruc: 'Sáng',
    tenBacSi: 'Bác sĩ Hoàng Văn E',
    idBacSi: 5,
  },
];

const AppointmentAdmin = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedShift, setSelectedShift] = useState<'Sáng' | 'Chiều'>('Sáng');
  const [reason, setReason] = useState<string>('');
  const [schedules, setSchedules] = useState<WorkSchedule[]>(mockSchedules);

  // Bộ lọc khoa & ngày xem lịch
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(''); // lọc cho hôm nay
  const [historySpecialty, setHistorySpecialty] = useState<string>(''); // lọc cho lịch sử
  const [historyDate, setHistoryDate] = useState<Date | undefined>(undefined);

  const specialties = Array.from(new Set(mockDoctors.map(doc => doc.specialty)));

  const handleAssignSchedule = () => {
    if (!selectedDate || !selectedDoctor) return;

    const newSchedule: WorkSchedule = {
      lichlvId: schedules.length + 1,
      ngay: format(selectedDate, 'yyyy-MM-dd'),
      caTruc: selectedShift,
      tenBacSi: mockDoctors.find(doc => doc.id === parseInt(selectedDoctor))?.name || '',
      idBacSi: parseInt(selectedDoctor),
      lyDoNghi: reason || undefined,
    };

    setSchedules([newSchedule, ...schedules]);
    setReason('');
  };

  const getShiftColor = (shift: 'Sáng' | 'Chiều') => {
    return shift === 'Sáng' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800';
  };

  const getStatusColor = (reason?: string) => {
    return reason ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý lịch làm việc bác sĩ</h1>
        <p className="text-muted-foreground">
          Phân chia lịch làm việc và xem lịch sử ca trực của bác sĩ
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form phân ca */}
        <Card>
          <CardHeader>
            <CardTitle>Phân ca làm việc</CardTitle>
            <CardDescription>Chọn ngày, bác sĩ và ca trực để phân lịch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Chọn ngày</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                locale={vi}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Chọn bác sĩ</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Chọn bác sĩ" />
                </SelectTrigger>
                <SelectContent>
                  {mockDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Chọn ca trực</Label>
              <RadioGroup
                value={selectedShift}
                onValueChange={(value) => setSelectedShift(value as 'Sáng' | 'Chiều')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sáng" id="morning" />
                  <Label htmlFor="morning" className="cursor-pointer">
                    Ca sáng (7:30 - 11:30)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Chiều" id="afternoon" />
                  <Label htmlFor="afternoon" className="cursor-pointer">
                    Ca chiều (13:30 - 17:30)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Lý do nghỉ (nếu có)</Label>
              <Textarea
                id="reason"
                placeholder="Nhập lý do nghỉ..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              onClick={handleAssignSchedule} 
              className="w-full"
              disabled={!selectedDate || !selectedDoctor}
            >
              Phân lịch làm việc
            </Button>
          </CardContent>
        </Card>

        {/* Lịch làm việc hôm nay */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch làm việc hôm nay</CardTitle>
            <CardDescription>{format(new Date(), 'EEEE, dd/MM/yyyy', { locale: vi })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Bộ lọc khoa */}
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc theo khoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-3">
              {schedules
                .filter(schedule => schedule.ngay === format(new Date(), 'yyyy-MM-dd'))
                .filter(schedule => {
                  if (!selectedSpecialty || selectedSpecialty === "all") return true;
                  const doctor = mockDoctors.find(d => d.id === schedule.idBacSi);
                  return doctor?.specialty === selectedSpecialty;
                })
                .map((schedule) => {
                  const specialty = mockDoctors.find(d => d.id === schedule.idBacSi)?.specialty;
                  return (
                    <div key={schedule.lichlvId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{schedule.tenBacSi} - {specialty}</p>
                        <Badge className={getShiftColor(schedule.caTruc)}>
                          Ca {schedule.caTruc.toLowerCase()}
                        </Badge>
                      </div>
                      <Badge variant={schedule.lyDoNghi ? "destructive" : "default"}>
                        {schedule.lyDoNghi ? 'Nghỉ' : 'Làm việc'}
                      </Badge>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lịch sử ca trực */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử ca trực</CardTitle>
          <CardDescription>Tất cả các ca làm việc đã được phân chia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Bộ lọc khoa + ngày */}
          <div className="flex flex-wrap gap-4">
            <Select value={historySpecialty} onValueChange={setHistorySpecialty}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Lọc theo khoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Calendar
              mode="single"
              selected={historyDate}
              onSelect={setHistoryDate}
              className="rounded-md border"
              locale={vi}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Bác sĩ</TableHead>
                <TableHead>Ca trực</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lý do nghỉ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules
                .filter(schedule => {
                  if (historyDate) {
                    return isSameDay(new Date(schedule.ngay), historyDate);
                  }
                  return true;
                })
                .filter(schedule => {
                  if (!historySpecialty || historySpecialty === "all") return true;
                  const doctor = mockDoctors.find(d => d.id === schedule.idBacSi);
                  return doctor?.specialty === historySpecialty;
                })
                .map((schedule) => {
                  const specialty = mockDoctors.find(d => d.id === schedule.idBacSi)?.specialty;
                  return (
                    <TableRow key={schedule.lichlvId}>
                      <TableCell>{format(new Date(schedule.ngay), 'dd/MM/yyyy', { locale: vi })}</TableCell>
                      <TableCell className="font-medium">{schedule.tenBacSi} - {specialty}</TableCell>
                      <TableCell>
                        <Badge className={getShiftColor(schedule.caTruc)}>{schedule.caTruc}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(schedule.lyDoNghi)}>
                          {schedule.lyDoNghi ? 'Nghỉ' : 'Làm việc'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {schedule.lyDoNghi || '-'}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <BackToTopButton/>
    </div>
  );
};

export default AppointmentAdmin;
